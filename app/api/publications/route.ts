import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server";

//API key definition
const key = process.env.ADMIN_API_KEY


//Next make sure to create your schema based on the schema prisma you wrote
const PublicationSchema = z.object({
    title: z.string(),
    authors: z.array(z.string()),
    year: z.int(),
    journal: z.string(),
    volume: z.string().optional(),
    pages: z.string().optional(),
    doi: z.string().optional(),
    link: z.string(),
    abstract: z.string(),
    researchArea: z.array(z.string()),
    method: z.array(z.string()),
    keywords: z.array(z.string()),
    openAccess: z.boolean().default(true),
}).strict();

const CreatePublicationsSchema = z.union([
  PublicationSchema,
  z.array(PublicationSchema)
]);

//First start with your POST function. Here body waits to receive request as json then its parsed, validated before created.
export async function POST(request:Request) {
    const authHeader = request.headers.get("authorization")
    if (!key) {
        console.error("ADMIN_API_KEY not set");
        return NextResponse.json(
            { error: "Server misconfiguration" },
            { status: 500 }
        );
    }
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return NextResponse.json(
            {error: "Unauthorised access"},
            {status: 401}
        )
    }
    const token = authHeader.slice(7).trim()
    if (token !== key) {
        return NextResponse.json(
            {error: "Forbidden. Incorrect credentials"},
            {status: 403},
        )
    }
    try {
    const body = await request.json()
    const parsed = CreatePublicationsSchema.safeParse(body)
    if (!parsed.success) {
        return NextResponse.json(
            {error: "Invalid input"},
            {status: 400}
        );
    }
    const items = Array.isArray(parsed.data) ? parsed.data : [parsed.data];

    // createMany is faster for bulk inserts
    await prisma.publication.createMany({ data: items });

    return NextResponse.json({ created: items.length }, { status: 201 });
    } catch (err) {
        console.log(err)
        return NextResponse.json({error: "Internal server error"}, {status: 500})
    }
    }
//THis is your handler for GET, much easier, fetch your data then return status info 
export async function GET() {
    try {
        const publications = await prisma.publication.findMany({orderBy: [{year: "desc"}, {createdAt: "desc"}]})
        return NextResponse.json(
            publications, {status: 200}
        )
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({
            error: "Failed retrieving publications data"
        }, {status: 500})
    }
}