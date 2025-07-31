import { NextResponse } from 'next/server';
import { Session } from 'next-auth';

interface Subscription {
  userId: string;
  planId: string;
  status: string;
  startDate: Date;
  endDate: Date;
}

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const subscription = await getSubscription(session.user.id);
    const currentPlan = subscription?.planId || 'basic';

    // Get usage stats from database
    const usageStats = await getUsageStats(session.user.id);

    return NextResponse.json({
      currentPlan,
      usageStats: {
        totalCalls: usageStats?.totalCalls || 0,
        maxCalls: 1000, // TODO: Get from plan
      },
    });
  } catch (error) {
    console.error('Error fetching subscription info:', error);
    return NextResponse.json(
      { error: 'Failed to fetch subscription information' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const session = await getServerSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { planId } = await request.json();

    // Update subscription in database
    const subscription = await updateSubscription(session.user.id, planId);

    return NextResponse.json({
      subscription,
    });
  } catch (error) {
    console.error('Error updating subscription:', error);
    return NextResponse.json(
      { error: 'Failed to update subscription' },
      { status: 500 }
    );
  }
}

export async function getServerSession(): Promise<Session> {
  // TODO: Implement session management
  return {
    user: {
      id: 'user_123',
      email: 'test@example.com',
      image: null
    },
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
  } as Session;
}

async function getSubscription(userId: string): Promise<Subscription | null> {
  // TODO: Implement actual database call
  return {
    userId,
    planId: 'basic',
    status: 'active',
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 1))
  };
}

async function getUsageStats(userId: string): Promise<{ totalCalls: number }> {
  // TODO: Implement actual database call
  return { totalCalls: 0 };
}

async function updateSubscription(userId: string, planId: string): Promise<Subscription> {
  // TODO: Implement actual database update
  return {
    userId,
    planId,
    status: 'active',
    startDate: new Date(),
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 1))
  };
}
