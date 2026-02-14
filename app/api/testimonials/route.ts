import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"

//API key definition
const key = process.env.ADMIN_API_KEY

//Adding personal comments for learning sake, this is how you write enums
const TestimonialTypeSchema = z.enum([
    "INDIVIDUAL",
    "COHORT",
])

//Next make sure to create your schema based on the schema prisma you wrote
const CreateTestimonialSchema = z.object({
    message: z.string(),
    authorLabel: z.string(),
    institution: z.string().optional(),
    type: TestimonialTypeSchema,
    isFeatured: z.boolean().default(false),

}).strict();

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
    const parsed = CreateTestimonialSchema.safeParse(body)
    if (!parsed.success) {
        return NextResponse.json(
            {error: "Invalid input"},
            {status: 400}
        );
    }
    const created = await prisma.testimonial.create(
            {data: parsed.data}
    );
    return NextResponse.json(created, {status: 201})
    } catch (err) {
        console.log(err)
        return NextResponse.json({error: "Internal server error"}, {status: 500})
    }
    }
//THis is your handler for GET, much easier, fetch your data then return status info 
export async function GET() {
    try {
        const testimonials = await prisma.testimonial.findMany({orderBy: [{isFeatured: "desc"}, {createdAt: "desc"},]})
        return NextResponse.json(
            testimonials, {status: 200}
        )
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({
            error: "Failed retrieving testimonial data"
        }, {status: 500})
    }
}