import { headers } from "next/headers"
import { auth } from "@/shared/lib/auth/auth"
import { cache } from "react"

export const getCurrentUser = cache(async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    return session?.user ?? null
})
