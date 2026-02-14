import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"

//Imports are nextResponse, zod and prisma

//define key variable
const key = process.env.ADMIN_API_KEY

//define enum type
const platformtype = z.enum([
    "LINKEDIN",
    "YOUTUBE",
    "PRIVATELEARN",
    "INSTAGRAM",

])

//define schema as z.object()
const createmediaschema = z.object({
    title: z.string(),
    playbackId: z.string(),
    platform: platformtype,
    description: z.string(),
    duration: z.string(),
    tags: z.array(z.string())
}).strict();

const createmediabatchschema = z.union([
  createmediaschema,
  z.array(createmediaschema),
])

//export POST function. Flow is validation checks first before try... catch of the actual post.
export async function POST(request: Request) {
    const authHeader = request.headers.get("authorization") 
    if (!key) {
        console.log("API Key not found")
        return NextResponse.json(
            {error: "Server misconfiguration"},
            {status: 500}
        )
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
            {status: 403}
        )
    }
    try{
        //Wait for body request.json(), then parse data and if parsed you create.
        const body = await request.json()
        const parsed = createmediabatchschema.safeParse(body)
        if (!parsed.success) {
            return NextResponse.json(
                {error: "Incorrect input"},
                {status: 400}
            )
        }
            // If array: batch insert
        if (Array.isArray(parsed.data)) {
        const result = await prisma.mediaPost.createMany({
            data: parsed.data,
            skipDuplicates: true, // optional but useful if playbackId is unique
        })
        return NextResponse.json(result, { status: 201 })
        }
        const created = await prisma.mediaPost.create(
            {data: parsed.data}
        )
        return NextResponse.json(
            created,
            {status: 201}
        )
    } catch (err) {
        console.log(err)
        return NextResponse.json(
            {error: "Internal server error"},
            {status: 500},
        )
    }
}

//To fetch simple .findmany on the prisma table then return output.
export async function GET() {
    try {
        const media = await prisma.mediaPost.findMany()
        return NextResponse.json(
            media,
            {status: 200},
        )
    } catch (err) {
        console.log(err)
        return NextResponse.json(
            {error: "Couldn't retrieve media details"},
            {status: 500}
        )
    }
}