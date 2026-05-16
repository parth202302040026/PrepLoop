import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

const PLAN_CREDITS = {
  pro: 15,
  starter: 5,
  free: 1,
};

const getCurrentPlan = async () => {
  const { has } = await auth();
  if (has({ plan: "pro" })) return "pro";
  if (has({ plan: "starter" })) return "starter";
  return "free";
};

const shouldAllocateCredits = (dbUser, currentPlan) => {
  if (dbUser.currentPlan !== currentPlan) return true;
  if (!dbUser.creditsLastAllocatedAt) return true;
  const now = new Date();
  const last = new Date(dbUser.creditsLastAllocatedAt);
  const isNewMonth =
    now.getFullYear() > last.getFullYear() || now.getMonth() > last.getMonth();
  return isNewMonth;
};

export const checkUser = async () => {
  const user = await currentUser();
  if (!user) return null;

  try {
    const currentPlan = await getCurrentPlan();
    const credits = PLAN_CREDITS[currentPlan];

    const loggedInUser = await db.user.findUnique({
      where: { clerkUserId: user.id },
    });

    if (loggedInUser) {
      if (loggedInUser.role === "INTERVIEWER") return loggedInUser;

      if (shouldAllocateCredits(loggedInUser, currentPlan)) {
        const rolledCredits = credits + (loggedInUser.credits ?? 0);
        return await db.user.update({
          where: { clerkUserId: user.id },
          data: {
            credits: rolledCredits,
            currentPlan,
            creditsLastAllocatedAt: new Date(),
          },
        });
      }

      return loggedInUser;
    }

    // New user — create with credits from their current plan
    const name = `${user.firstName} ${user.lastName}`;
    const email = user.emailAddresses[0].emailAddress;

    return await db.user.upsert({
      where: { email },
      update: {
        clerkUserId: user.id,
        imageUrl: user.imageUrl,
      },
      create: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl,
        email,
        credits,
        currentPlan,
        creditsLastAllocatedAt: new Date(),
      },
    });
  } catch (error) {
    console.error("checkUser error:", error.message);
    return null;
  }
};