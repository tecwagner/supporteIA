/**
 * Domain types for SupportAI.
 * These types mirror the Firestore data model exactly.
 * Keep in sync with firestore.rules and docs/data-model.md.
 */
import type { Timestamp } from "firebase/firestore";

// ---------------------------------------------------------------------------
// User
// ---------------------------------------------------------------------------
export interface UserProfile {
  displayName: string;
  email: string;
  photoURL: string | null;
  createdAt: Timestamp;
  lastLoginAt: Timestamp;
}

// ---------------------------------------------------------------------------
// Organization
// ---------------------------------------------------------------------------
export type OrgStatus = "active" | "suspended";
export type PlanType = "starter" | "pro" | "business";

export interface Organization {
  id: string;
  name: string;
  slug: string;
  ownerId: string;
  status: OrgStatus;
  plan: PlanType;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// ---------------------------------------------------------------------------
// Member
// ---------------------------------------------------------------------------
export type MemberRole = "owner" | "admin" | "agent" | "end_user";
export type MemberStatus = "active" | "suspended" | "pending";

export interface OrgMember {
  userId: string;
  role: MemberRole;
  status: MemberStatus;
  joinedAt: Timestamp;
}

// ---------------------------------------------------------------------------
// Document & Chunks
// ---------------------------------------------------------------------------
export type DocumentProcessingStatus =
  | "pending"
  | "processing"
  | "ready"
  | "error"
  | "deleting";

export interface KnowledgeDocument {
  id: string;
  title: string;
  fileName: string;
  mimeType: string;
  contentHash: string;
  version: number;
  processingStatus: DocumentProcessingStatus;
  chunkCount: number;
  createdBy: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface DocumentChunk {
  id: string;
  text: string;
  index: number;
  page: number | null;
  section: string | null;
  contentHash: string;
  createdAt: Timestamp;
}

// ---------------------------------------------------------------------------
// Conversation & Messages
// ---------------------------------------------------------------------------
export type ConversationStatus = "active" | "closed";
export type MessageRole = "user" | "assistant";

export interface Conversation {
  id: string;
  userId: string;
  status: ConversationStatus;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  citationIds: string[];
  createdAt: Timestamp;
}

// ---------------------------------------------------------------------------
// Tickets
// ---------------------------------------------------------------------------
export type TicketPriority = "low" | "medium" | "high" | "urgent";
export type TicketStatus =
  | "OPEN"
  | "TRIAGED"
  | "IN_PROGRESS"
  | "WAITING_CUSTOMER"
  | "RESOLVED"
  | "CLOSED";

export interface Ticket {
  id: string;
  requesterId: string;
  assignedAgentId: string | null;
  category: string;
  priority: TicketPriority;
  status: TicketStatus;
  summary: string;
  sourceConversationId: string | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface TicketEvent {
  id: string;
  actorId: string;
  eventType: string;
  previousStatus: string | null;
  newStatus: string | null;
  createdAt: Timestamp;
}

// ---------------------------------------------------------------------------
// Feedback & Usage
// ---------------------------------------------------------------------------
export interface Feedback {
  id: string;
  userId: string;
  conversationId: string;
  messageId: string;
  rating: 1 | 2 | 3 | 4 | 5;
  reason: string | null;
  createdAt: Timestamp;
}

export type UsageEventType = "question" | "document_upload" | "document_delete";

export interface UsageEvent {
  id: string;
  userId: string;
  eventType: UsageEventType;
  quantity: number;
  createdAt: Timestamp;
}
