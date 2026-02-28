/**
 * Universo Platformo | useOnboardingApi composable
 *
 * Provides onboarding API methods that use the single shared Axios client
 * from AuthProvider.  This guarantees that CSRF tokens, 401 redirects, and
 * retry logic are handled by the same interceptor chain across the entire app,
 * rather than a separate standalone axios instance.
 *
 * Architecture note:
 *   Frontend → Django backend (/api/v1) → Supabase
 *   The frontend NEVER calls Supabase directly.
 */

import { useAuth } from '@universo/auth-frontend'
import type { OnboardingItems, JoinItemsRequest, JoinItemsResponse } from '../types'

export function useOnboardingApi() {
    const { client } = useAuth()

    /**
     * Fetch all available onboarding items (projects, campaigns, clusters)
     * and the current onboarding completion status from the Django backend.
     */
    const getOnboardingItems = async (): Promise<OnboardingItems> => {
        const response = await client.get<OnboardingItems>('/onboarding/items')
        return response.data
    }

    /**
     * Persist the user's selection of projects, campaigns, and clusters
     * via the Django backend.
     */
    const joinItems = async (data: JoinItemsRequest): Promise<JoinItemsResponse> => {
        const response = await client.post<JoinItemsResponse>('/onboarding/join', data)
        return response.data
    }

    return { getOnboardingItems, joinItems }
}
