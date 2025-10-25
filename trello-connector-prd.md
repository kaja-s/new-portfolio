# Product Requirements Document
## DevRev AirSync Connector for Trello

**Version:** 1.0  
**Date:** October 9, 2025  


---

## 1. Executive Summary

The DevRev AirSync Connector for Trello enables seamless bi-directional synchronization between Trello and DevRev, allowing organizations to maintain their existing Trello workflows while leveraging DevRev's powerful collaboration and analytics capabilities. This connector will automatically sync users, boards, cards, comments, attachments, and metadata between both platforms.

---

## 2. Objectives

### Primary Objectives
- Enable automated synchronization of Trello data into DevRev
- Maintain data consistency between Trello and DevRev platforms
- Preserve organizational structure and relationships from Trello

### Success Metrics
- Successful initial sync completion rate: >99,999%
- Data accuracy rate: >99,999%
- Ongoing sync latency: <5 minutes for 5k cards with 30k comments, 100 users, 1 board with 7 lists

---

## 3. Scope

### In Scope
- Fetching and syncing all Trello entities listed in section 5
- One-way sync from Trello to DevRev (initial phase)
- OAuth 1 authentication with Trello using API key and secret and user authorisation
- Incremental sync after initial full sync
- Error handling including rate limiting and retry mechanisms
- Sync status monitoring and logging

### Out of Scope (Future Phases)
- Bi-directional sync (DevRev → Trello)
- Multi-organization parallel sync
- Trello custom fields sync
- Webhook-based real-time sync

---

## 4. User Personas

### Primary Users
1. **DevRev Administrators** - Configure and manage the Trello connector
2. **Project Managers** - Monitor sync status and resolve conflicts
3. **Development Teams** - Access Trello data within DevRev workflows
4. **Product Managers** - Leverage unified data for reporting and analytics

---

## 5. Functional Requirements

### 5.1 Authentication & Authorization

**FR-1.1:** The connector and Cellarman shall support OAuth 1 authentication with Trello  
**FR-1.2:** After authentication, the Cellarman shall fetch and display all organizations the authenticated user can access  
**FR-1.3:** The Cellarman shall allow the user to select one organization from the list for data import/sync  
**FR-1.4:** The Cellarman shall validate that the user has sufficient permissions (read access minimum) for the selected organization  

### 5.2 Data Fetching Requirements

#### 5.2.1 Users (Members)
**FR-2.1:** Fetch all members of the organization including:
- Member ID
- Username
- Full name
- Email address (if available)
- Avatar URL
- Member type (admin, normal, observer)
- Status (active, inactive)
- and the other provided fields for user object

**API Endpoints:**
- `GET /1/organizations/{id}/members`
- `GET /1/members/{id}`

#### 5.2.2 Boards
**FR-2.2:** Fetch all boards accessible to the organization including:
- Board ID
- Board name
- Description
- URL
- Closed status
- Organization ID
- Starred status
- Permissions (detailed permission settings)
- Preferences (background, comments, voting, etc.)
- Creation date
- Last activity date
- and the other provided fields for board object

**Board Permission Fields to Fetch:**
- `prefs.permissionLevel` (private, org, public)
- `prefs.voting` (disabled, members, observers, org, public)
- `prefs.comments` (disabled, members, observers, org, public)
- `prefs.invitations` (members, admins)
- `prefs.selfJoin` (boolean - workspace members can join)
- Board membership list with roles (admin, normal, observer)

**API Endpoints:**
- `GET /1/organizations/{id}/boards`
- `GET /1/boards/{id}`
- `GET /1/boards/{id}?fields=all&prefs=true`

#### 5.2.3 Lists
**FR-2.3:** Fetch all lists within each board including:
- List ID
- List name
- Board ID
- Position
- Closed status
- Type

**API Endpoint:** `GET /1/boards/{id}/lists`

#### 5.2.4 Cards
**FR-2.4:** Fetch all cards within each list including:
- Card ID
- Name
- Description
- List ID
- Board ID
- Position
- Due date
- Due complete status
- Closed status
- Members assigned
- URL
- Creation date
- Creator
- Modification date
- Modifier
- Last activity date
- and the other provided fields for card object

**API Endpoints:**
- `GET /1/boards/{id}/cards`
- `GET /1/lists/{id}/cards`
- `GET /1/cards/{id}`

#### 5.2.5 Comments on Cards
**FR-2.5:** Fetch all comments (actions of type commentCard) on cards including:
- Comment ID
- Card ID
- Member ID (author)
- Comment text
- Creation date
- Modification date

**API Endpoint:** `GET /1/cards/{id}/actions?filter=commentCard`

#### 5.2.6 Attachments on Cards
**FR-2.6:** Fetch all attachments on cards including:
- Attachment ID
- Card ID
- Name
- URL
- File size
- MIME type
- Upload date
- Member ID (uploader)

**API Endpoint:** `GET /1/cards/{id}/attachments`

#### 5.2.7 Labels on Cards
**FR-2.7:** Fetch all labels on cards including:
- Label ID
- Label name
- Color
- Board ID

**API Endpoint:** `GET /1/cards/{id}/labels`

### 5.3 Data Mapping Requirements

#### Mapping Table

| Trello Entity | DevRev Entity | Mapping Details |
|---------------|---------------|-----------------|
| User (Member) | Dev User | Map by email or external ID |
| Board | External Sync Unit | One board = one sync unit |
| Card | Issue | One card = one issue |
| List | Issue Stage | Map list names to stage identifiers |
| Comment on Card | Comment on Issue | Preserve author and timestamp |
| Attachment on Card | Issue Attachment | Maintain file references |
| Label on Card | Tag on Issue | Map label names and colours to tags |

#### 5.3.1 User to Dev User Mapping
**FR-3.1:** Map Trello users to DevRev dev users based on:
- Primary: Email address match
- Secondary: External ID mapping
- Create new dev user if no match found

#### 5.3.2 Board to External Sync Unit Mapping
**FR-3.2:** Create one external_sync_unit per Trello board with:
- Name: Trello board name
- External ID: Trello board ID

**FR-3.3:** Create DevRev issue subtypes from Trello boards:
- One issue subtype per Trello board
- Subtype name: Trello board name

**FR-3.4:** Transform Trello board permissions into DevRev MFZ role set targets for the issue subtype:

**Permission Mapping Logic:**

| Trello Permission Setting | Trello Value | DevRev MFZ Role Mapping |
|---------------------------|--------------|-------------------------|
| **Board Visibility** | `private` | Zone-restricted (only explicit members) |
| | `org` (Workspace visible) | Member role (all workspace members) |
| | `public` | Follower role (read-only for external users) |
| **Commenting** | `disabled` | No comment permissions for any role |
| | `members` | Only Member role can comment |
| | `observers` | Member and Follower roles can comment |
| | `org` | All workspace members can comment |
| | `public` | All roles including external can comment |
| **Member Invitations** | `admins` | Only Admin role can add members |
| | `members` | Member role can add members |
| **Self-Join** | `true` | Workspace members auto-assigned Member role |
| | `false` | Explicit invitation required |
| **Board Member Roles** | `admin` | Admin role with full permissions |
| | `normal` | Member role with standard permissions |
| | `observer` | Follower role (read-only) |

**FR-3.5:** Store permission configuration metadata:
```json
{
  "board_id": "trello_board_id",
  "issue_subtype_id": "devrev_subtype_id",
  "permission_level": "private|org|public",
  "commenting_level": "disabled|members|observers|org|public",
  "invitation_level": "admins|members",
  "self_join_enabled": true|false,
  "mfz_role_mappings": {
    "admin": ["board_admins"],
    "member": ["board_members", "workspace_members"],
    "follower": ["observers", "public_viewers"]
  }
}
```

**FR-3.6:** Apply workspace-level permissions:
- Workspace admins → Issue subtype admins
- Workspace normal members → Member role (if board is workspace-visible)
- Workspace observers → Follower role
- Workspace visibility (public/private) influences default access levels

#### 5.3.3 Card to Issue Mapping
**FR-3.7:** Map each Trello card to a DevRev issue with:
- Title: Card name
- Body: Card description
- Status: Derived from list name and position
- Priority: Inferred from labels or default to medium
- Assignees: Mapped from card members
- Due date: From card due date
- External ID: Trello card ID
- Source URL: Trello card URL
- Issue subtype: Linked to the board's corresponding issue subtype

**FR-3.8:** Handle card movements between lists as status changes

#### 5.3.4 List to Issue Stage Mapping
**FR-3.9:** Map Trello lists to DevRev issue stages:
- Maintain stage order based on list position
- Support standard stage names (To Do, In Progress, Done, etc.)
- Allow custom stage mapping configuration during setup
- Default mapping suggestions:
  - Lists containing "backlog" → Backlog
  - Lists containing "to do" → To Do
  - Lists containing "progress" → In Progress
  - Lists containing "review" → In Review
  - Lists containing "done" → Done
  - Lists containing "archive" → Closed

**FR-3.10:** Configure stage transitions as "to any":
- All stages can transition to any other stage
- No transition restrictions enforced
- Support flexible workflow changes

**FR-3.11:** During stage mapping configuration, require user to specify the state for each stage:
- **Open**: Initial stages where work hasn't started
- **In Progress**: Active work stages
- **Closed**: Completed or archived stages
- Store state mapping for each Trello list
- Use state to determine issue status in DevRev

**FR-3.12:** When a card moves between lists:
- Update the issue stage to the corresponding DevRev stage
- Update the issue state based on the target stage's configured state

#### 5.3.5 Comment to Comment Mapping
**FR-3.13:** Map Trello card comments to DevRev issue comments with:
- Body: Comment text
- Author: Mapped DevRev user
- Created date: Original timestamp
- External ID: Trello action ID
- Preserve comment order chronologically
- Apply commenting permissions based on board permission settings

#### 5.3.6 Attachment to Issue Attachment Mapping
**FR-3.14:** Map Trello card attachments to DevRev issue attachments:
- Download attachment file from Trello URL
- Upload to DevRev storage
- Maintain filename and MIME type
- Store original Trello URL as metadata
- Link to parent issue
- Record uploader

**FR-3.15:** Support attachment size limits (max 25MB per file)

#### 5.3.7 Label to Tag Mapping
**FR-3.16:** Map Trello labels to DevRev tags:
- Tag name: Label name (or "Label-{color}" if no name)
- Maintain color coding
- Create tags if they don't exist
- Apply tags to issues based on card labels

### 5.4 Field Mapping Strategy

**FR-3.17:** Implement field mapping from Trello to DevRev:
- Map Trello fields to DevRev stock fields when direct equivalents exist
- Create custom fields for Trello fields that have no stock field equivalent
- Maintain field type compatibility (text, date, boolean, number, etc.)

#### 5.4.1 Stock Field Mappings

**FR-3.18:** Map the following Trello card fields to DevRev issue stock fields:

| Trello Field | DevRev Stock Field | Data Type |
|--------------|-------------------|-----------|
| `name` | `title` | String |
| `desc` | `body` | String (Markdown) |
| `due` | `due_date` | DateTime |
| `dueComplete` | Custom field: `trello_due_complete` | Boolean |
| `dateLastActivity` | `modified_date` | DateTime |
| `closed` | Derived to `state` (closed) | Boolean → Enum |
| `Board.name` | Custom field: `board name` | String |
| `idList` | `stage` | Reference |
| `pos` | Custom field: `trello_position` | Number |
| `url` | `source_url` or custom field | URL |
| `idMembers` | `assignees` | Array of References |
| `subscribed` | Custom field: `trello_subscribed` | Boolean |
| `cover` | Custom field: `trello_cover_image` | JSON/Object |
| `badges` | Custom fields (various) | Object |
| `start` | Custom field: `trello_start_date` | DateTime |

**FR-3.19:** Map the following Trello board fields to DevRev external_sync_unit and issue subtype fields:

| Trello Field | DevRev Target | Data Type | Notes |
|--------------|---------------|-----------|-------|
| `name` | Issue subtype `name` | String | Board name becomes subtype name |
| `desc` | Issue subtype `description` | String | Board description |
| `url` | Custom field: `trello_url` | URL | Link to original Trello board |
| `closed` | `archived` or custom field | Boolean | Archived status |
| `starred` | Custom field: `trello_starred` | Boolean | |
| `dateLastActivity` | Custom field: `trello_last_activity` | DateTime | |
| `prefs.permissionLevel` | MFZ role config | Enum | Mapped to DevRev permissions |
| `prefs.voting` | Custom field: `trello_voting` | String | |
| `prefs.comments` | MFZ role config | Enum | Affects comment permissions |
| `prefs.invitations` | MFZ role config | Enum | Affects member management |
| `prefs.selfJoin` | MFZ role config | Boolean | Auto-membership rules |
| `prefs.background` | Custom field: `trello_background` | String | |
| `memberships` | MFZ role assignments | Array | Board member roles |

**FR-3.20:** Map the following Trello member fields to DevRev dev user stock fields:

| Trello Field | DevRev Stock Field | Data Type |
|--------------|-------------------|-----------|
| `fullName` | `display_name` | String |
| `username` | `username` | String |
| `email` | `email` | String |
| `avatarUrl` | `avatar_url` | URL |
| `bio` | Custom field: `trello_bio` | String |
| `confirmed` | Custom field: `trello_confirmed` | Boolean |
| `memberType` | Custom field: `trello_member_type` | String |

#### 5.4.2 Custom Field Creation

**FR-3.21:** For Trello fields without stock field equivalents:
- Automatically create custom fields in DevRev as a issue subtype fragment
- Map field types appropriately
- Maintain user friendly names whenever possible or genereate them from the field names

**FR-3.22:** For Trello custom fields (Power-Ups):
- Detect custom fields on cards
- Create corresponding DevRev custom fields
- Maintain custom field values across syncs

### 5.5 Sync Logic

#### 5.5.1 Initial Sync
**FR-4.1:** Perform full initial sync in the following order:
1. Fetch all boards (external sync units)
2. Fetch board details
3. Fetch all lists in metadata extraction to provide stage diagram info
4. Fetch and sync all users
5. Fetch and sync all labels on board
6. Fetch and sync all cards on board
7. Fetch and sync all comments on cards
8. Fetch and sync all attachments on cards

**FR-4.2:** Display progress indicator during initial sync with:
- Percentage complete per object type
- Current step
- Extracted data report
- Error report

#### 5.5.2 Incremental Sync
**FR-4.3:** After initial sync, perform incremental updates:
- Poll Trello API at configurable intervals (default: 5 minutes)
- Use `since` parameter with last sync timestamp
- Process only changed entities
- Update existing DevRev objects
- Detect and sync newly added lists, cards, comments, attachments, labels, permissions

**FR-4.4:** Time scoped sync supprt:
- Support time scoped sync by using the sync_from_date attribute from the context
- Fetch only cards created since provided date and all linked comments, attachments, and labels
- Fetch only users created since provided date if possible

### 5.6 Error Handling

**FR-5.1:** Implement exponential backoff for API rate limits:
- Initial retry: 1 second
- Maximum retry: 60 seconds
- Respect Trello rate limits:
  - 300 requests per 10 seconds for each API key 
  - 100 requests per 10 second interval for each token
  - on /1/members/: 100 requests per 900 seconds

---

## 6. Technical Requirements

### 6.1 API Integration

**TR-1.1:** Use Trello REST API v1  
**TR-1.2:** Base URL: `https://api.trello.com/1/`  
**TR-1.3:** Support all required query parameters:
- `key`: API key
- `token`: OAuth token
- `fields`: Specific fields to retrieve
- `filter`: Filter criteria
- `since`: Last modified date for incremental sync

**TR-1.4:** Handle pagination for large result sets  
**TR-1.5:** Implement request batching where supported

### 6.2 Performance Requirements

**TR-2.1:** Initial sync completion time:
- Ongoing sync latency: <5 minutes for 5k cards with 30k comments, 100 users, 1 board with 7 lists
- <5 minutes for organizations with <5k cards and 10k comments

**TR-2.2:** API request rate: Respect Trello limits (300 req/10 sec)  

### 6.3 Data Storage

**TR-3.1:** Store sync metadata:
- For each issue add sync_metadata structure

---

## 7. User Interface Requirements

### 7.1 Configuration Screen

**UI-1.1:** Provide configuration interface with:
- **Step 1: Authentication**
  - Trello OAuth connection button
  - Success/failure status indicator
  
- **Step 2: Organization Selection (Cellarman)**
  - Display list of all organizations the user can access
  - Show organization name
  - Single-select dropdown
  - Selected organization confirmation
  
- **Step 3: Board Selection (External sync unit selection)**
  - Multi-select checkbox list of boards in selected organization
  - "Select All" / "Deselect All" options
  
- **Step 4: Stage Mapping Configuration**
  - List all Trello lists from selected boards
  - For each list, provide:
    - DevRev stage name input field (pre-filled with suggestions)
    - State dropdown (Open / In Progress / Closed)
    - Preview of transition rules (show "to any" capability)
  - Save mapping configuration button

---

## 8. API Endpoints Reference

### Required Trello API Endpoints

| Endpoint | Purpose | Priority |
|----------|---------|----------|
| `GET /1/members/me/organizations` | List all organizations user can access | High |
| `GET /1/organizations/{id}` | Fetch organization details | High |
| `GET /1/organizations/{id}/members` | Fetch organization members | High |
| `GET /1/members/{id}` | Fetch member details | High |
| `GET /1/organizations/{id}/boards` | Fetch organization boards | High |
| `GET /1/boards/{id}` | Fetch board details | High |
| `GET /1/boards/{id}/lists` | Fetch board lists | High |
| `GET /1/boards/{id}/cards` | Fetch board cards | High |
| `GET /1/lists/{id}/cards` | Fetch list cards | Medium |
| `GET /1/cards/{id}` | Fetch card details | High |
| `GET /1/cards/{id}/actions` | Fetch card actions (comments) | High |
| `GET /1/cards/{id}/attachments` | Fetch card attachments | High |
| `GET /1/cards/{id}/labels` | Fetch card labels | High |
| `GET /1/boards/{id}/customFields` | Fetch custom fields (Power-Ups) | Medium |

---

## 9. Non-Functional Requirements

### 9.1 Reliability
- 99.5% uptime SLA
- Automated periodic health checks 
- Self-healing mechanisms (retries) for transient failures

### 9.2 Scalability
- Support organizations with up to 1M cards on a single list

### 9.3 Maintainability
- Comprehensive logging with log levels
- PII and sensitive data removed from logs
- API version compatibility checks

### 9.4 Compliance
- GDPR compliance for user data handling
- SOC 2 Type II compliance
- Data retention policies aligned with DevRev standards

---

## 10. Testing Requirements

### 10.1 Unit Tests
- API client methods
- Data normalisation logic
- Syntactic correctnes of EDM
- Field mapping configuration in IDM
- Stage state resolution
- Error handling routines

### 10.2 Integration Tests
- End-to-end sync workflow
- Organization selection flow
- Stage transition with "to any" logic
- Custom field creation and synchronization
- Rate limit handling
- Data accordance to the EDM

### 10.3 Performance Tests
- Load test with 30,000 cards
- Stress test concurrent syncs
- Custom field creation at scale
- API rate limit compliance
- Memory usage profiling

### 10.4 User Acceptance Tests
- Configuration workflow with org selection
- Stage state mapping configuration
- Field mapping and customization
- Initial sync completion
- Incremental sync accuracy
- Error recovery procedures

---

## 11. Documentation Requirements

**DOC-1:** Troubleshooting guide    
**DOC-2:** Release notes

---

## 12. Assumptions and Dependencies

### Assumptions
- Trello API v1 remains stable and supported
- Organizations have valid Trello Enterprise or Business Class accounts
- Users have appropriate permissions to access Trello API

### Dependencies
- Trello REST API availability
- DevRev AirSync framework
- OAuth 1 authentication on Celerman

---

## 13. Risks and Mitigations

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Trello API changes | High | Medium | Monitor API changelog, version pinning |
| Rate limit exceeded | Medium | High | Implement intelligent backoff, request optimization |
| Large attachment sync | Medium | High | Async processing, size limits, compression |
| Authentication token expiry | High | Low | Automated refresh, user notifications |
| Data inconsistency | High | Low | Validation checks, reconciliation jobs |
| Custom field name conflicts | Medium | Low | Unique naming convention with prefixes |
| Complex nested data mapping | Medium | High | JSON fallback for unsupported structures |
| Stage state misconfiguration | High | Medium | Validation, suggested defaults, preview mode |
| Multiple org selection confusion | Low | Medium | Clear UI, confirmation steps |

---

## 14. Release Plan

### Phase 1: Initial Sync
- OAuth authentication
- Organization selection from accessible orgs
- Organization, boards, cards, lists sync
- User mapping
- Basic stock field mapping
- Initial sync only
- Stage state configuration (Open/In Progress/Closed)
- Custom field creation and mapping
- Comments sync
- Attachments sync
- Labels sync
- Stage transition "to any" implementation

### Phase 2: Incremental Sync, Time Scoped Sync & Optimization
- Incremental sync with polling
- Time scoped sync
- Performance optimization
- Comprehensive testing

### Phase 3: Advanced Features (Future)
- Bi-directional sync
- Advanced custom field mapping rules
- Bulk operations
- Analytics and reporting
- Real-time sync via webhooks

---

## 16. Appendix

### A. Glossary
- **AirSync**: DevRev's data synchronization framework
- **External Sync Unit**: DevRev representation of external namespace (board)
- **Dev User**: Developer user account in DevRev
- **Issue Stage**: Workflow stage for issues (e.g., To Do, In Progress)
- **Stock Field**: Built-in DevRev field with standard schema
- **Custom Field**: User-defined field created to store additional data
- **Stage State**: The operational state of a stage (Open, In Progress, Closed)
- **Stage Transition "To Any"**: Configuration allowing transitions from any stage to any other stage without restrictions

### B. References
- Trello REST API Documentation: https://developer.atlassian.com/cloud/trello/guides/rest-api/api-introduction/
- OAuth 1 Specification: [RFC 5849](https://datatracker.ietf.org/doc/html/rfc5849)
- DevRev AirSync Documentation

### C. Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Oct 9, 2025 | Drago | Initial draft with comprehensive requirements including: organization selection, stage state mapping (Open/In Progress/Closed), "to any" stage transitions, stock and custom field mapping, removed webhook support |