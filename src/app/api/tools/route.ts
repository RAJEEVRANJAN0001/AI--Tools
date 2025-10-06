import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'aiToolsData_updated.json')
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'Updated tools file not found' }, { status: 404 })
    }

    const raw = fs.readFileSync(filePath, { encoding: 'utf8' })
    const data = JSON.parse(raw)

    return NextResponse.json(data)
  } catch (err: any) {
    console.error('Error reading updated tools file:', err)
    return NextResponse.json({ error: 'Failed to read tools file' }, { status: 500 })
  }
}
