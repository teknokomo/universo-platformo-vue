/**
 * Universo Platformo | Start Frontend Types
 */

export interface OnboardingItem {
    id: string
    title: string
    description?: string
    imageUrl?: string
}

export interface OnboardingItems {
    projects: OnboardingItem[]
    campaigns: OnboardingItem[]
    clusters: OnboardingItem[]
    onboardingCompleted: boolean
}

export interface JoinItemsRequest {
    projectIds?: string[]
    campaignIds?: string[]
    clusterIds?: string[]
}

export interface JoinItemsResponse {
    success: boolean
    message?: string
}
