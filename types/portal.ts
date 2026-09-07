export type ResourceKind = "speech" | "document" | "video" | "gallery" | "notice";
export interface PublicResource {
  id: string; kind: ResourceKind; title: string; description: string; category?: string;
  speaker?: string; event?: string; date?: string; publishDate?: string; youtubeUrl?: string;
  thumbnailUrl?: string; fileUrl?: string; fileName?: string; fileType?: string; fileSize?: number;
  imageUrls?: string[]; coverImageUrl?: string; priority?: "normal" | "important" | "urgent"; startDate?: string; expiryDate?: string;
  published: boolean; createdAt?: string; updatedAt?: string;
}
