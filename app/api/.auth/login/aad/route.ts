import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest){
    try  {
        const data = await req.json();
        const headers = req.headers;
        return NextResponse.json(headers, {status: 200});
    } catch (e){

    }
}