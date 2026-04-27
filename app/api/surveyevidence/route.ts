import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"

//API key definition
const key = process.env.ADMIN_API_KEY


//Next make sure to create your schema based on the schema prisma you wrote
const CreateSurveyEvidenceSchema = z.object({
    title: z.string(),
    institution: z.string().optional(),
    cohortLabel: z.string().optional(),
    respondentCount: z.number(),
    metricsJson: z.any(),
    selectedCommentsJson: z.any().optional(),
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
    const parsed = z.array(CreateSurveyEvidenceSchema).safeParse(body)
    if (!parsed.success) {
        return NextResponse.json(
            {error: "Invalid input"},
            {status: 400}
        );
    }
    const created = await prisma.surveyEvidence.createMany(
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
        const surveyEvidence = await prisma.surveyEvidence.findMany()
        return NextResponse.json(
            surveyEvidence, {status: 200}
        )
    }
    catch (err) {
        console.log(err)
        return NextResponse.json({
            error: "Failed retrieving survey evidence data"
        }, {status: 500})
    }
}