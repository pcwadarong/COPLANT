import { NextResponse, NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
  try {
    const { secret } = await req.json();

    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await revalidatePath('/product', 'layout');
    return NextResponse.json({ revalidated: true });
  } catch (err) {
    console.error('revalidate 실패:', err);
    return NextResponse.json(
      { revalidated: false, error: String(err) },
      { status: 500 },
    );
  }
}
