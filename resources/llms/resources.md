# Docs by LangChain

## Docs

- [Authenticate](https://docs.langchain.com/api-reference/auth-service-v2/authenticate.md): Get OAuth token or start authentication flow if needed.
- [Check Oauth Token Exists](https://docs.langchain.com/api-reference/auth-service-v2/check-oauth-token-exists.md): Return whether the current user has any tokens for a given provider (across agents).
- [Create Mcp Oauth Provider](https://docs.langchain.com/api-reference/auth-service-v2/create-mcp-oauth-provider.md): Create an OAuth provider via MCP auto-discovery.
- [Create Oauth Provider](https://docs.langchain.com/api-reference/auth-service-v2/create-oauth-provider.md): Create a new OAuth provider manually.
- [Delete Oauth Provider](https://docs.langchain.com/api-reference/auth-service-v2/delete-oauth-provider.md): Delete an OAuth provider.
- [Delete Oauth Tokens For User](https://docs.langchain.com/api-reference/auth-service-v2/delete-oauth-tokens-for-user.md): Delete all tokens for the current user for the given provider (across agents).
- [Get Oauth Provider](https://docs.langchain.com/api-reference/auth-service-v2/get-oauth-provider.md): Get a specific OAuth provider.
- [List Oauth Providers](https://docs.langchain.com/api-reference/auth-service-v2/list-oauth-providers.md): List OAuth providers.
- [Oauth Callback](https://docs.langchain.com/api-reference/auth-service-v2/oauth-callback.md)
- [Oauth Callback Get](https://docs.langchain.com/api-reference/auth-service-v2/oauth-callback-get.md): Handle OAuth callback redirect from OAuth providers.

Processes the OAuth token exchange, then redirects to the frontend callback
page for a consistent UI experience.
- [Oauth Setup Callback](https://docs.langchain.com/api-reference/auth-service-v2/oauth-setup-callback.md): Handle OAuth setup callback redirect from GitHub Apps.

This endpoint handles the "Setup URL" callback from GitHub Apps, which is
triggered when a user installs or updates their GitHub App installation.

For "update" actions (user modified repo access via GitHub), we just show
a success page since no token exchange is needed.

For new installations with code/state, we process similar to the regular
OAuth callback.
- [Update Oauth Provider](https://docs.langchain.com/api-reference/auth-service-v2/update-oauth-provider.md): Update an OAuth provider.
- [Wait For Auth Completion](https://docs.langchain.com/api-reference/auth-service-v2/wait-for-auth-completion.md): Wait for OAuth authentication completion.
- [Create Deployment](https://docs.langchain.com/api-reference/deployments-v2/create-deployment.md): Create a new deployment.
- [Delete Deployment](https://docs.langchain.com/api-reference/deployments-v2/delete-deployment.md): Delete a deployment by ID.
- [Get Deployment](https://docs.langchain.com/api-reference/deployments-v2/get-deployment.md): Get a deployment by ID.
- [Get Revision](https://docs.langchain.com/api-reference/deployments-v2/get-revision.md): Get a revision by ID for a deployment.
- [List Deployments](https://docs.langchain.com/api-reference/deployments-v2/list-deployments.md): List all deployments.
- [List Revisions](https://docs.langchain.com/api-reference/deployments-v2/list-revisions.md): List all revisions for a deployment.
- [Patch Deployment](https://docs.langchain.com/api-reference/deployments-v2/patch-deployment.md): Patch a deployment by ID.
- [Redeploy Revision](https://docs.langchain.com/api-reference/deployments-v2/redeploy-revision.md): Redeploy a specific revision ID.
- [List GitHub Integrations](https://docs.langchain.com/api-reference/integrations-v1/list-github-integrations.md): List available GitHub integrations for LangGraph Platfom Cloud SaaS.
- [List GitHub Repositories](https://docs.langchain.com/api-reference/integrations-v1/list-github-repositories.md): List available GitHub repositories for an integration that are available to deploy to LangSmith Deployment.
- [Create Listener](https://docs.langchain.com/api-reference/listeners-v2/create-listener.md): Create a listener.<br>
<br>
Creating a listener is only allowed for LangSmith organizations with self-hosted enterprise plans.
- [Delete Listener](https://docs.langchain.com/api-reference/listeners-v2/delete-listener.md): Delete a listener by ID.
- [Get Listener](https://docs.langchain.com/api-reference/listeners-v2/get-listener.md): Get a listener by ID.
- [List Listeners](https://docs.langchain.com/api-reference/listeners-v2/list-listeners.md): List all listeners.
- [Patch Listener](https://docs.langchain.com/api-reference/listeners-v2/patch-listener.md): Patch a listener by ID.
- [Create a Sandbox](https://docs.langchain.com/api-reference/sandboxes-v2/create-a-sandbox.md): Create a new SandboxClaim in tenant's namespace.

If wait_for_ready is True (default), this will block until the sandbox
is ready or the timeout is reached.

The sandbox creation can fail for several reasons:
- Image pull errors (invalid image, registry auth issues)
- Container crashes (bad entrypoint, missing dependencies, health check failures)
- Scheduling failures (no suitable nodes available)

Sandbox creation is subject to quota limits (count, CPU, memory)
configured via Metronome org config.

On failure, the claim is automatically cleaned up and a descriptive error
is returned.
- [Create a Sandbox Pool](https://docs.langchain.com/api-reference/sandboxes-v2/create-a-sandbox-pool.md): Create a new Sandbox Pool in tenant's namespace.

Pools pre-provision sandboxes from a template for faster claim binding.

Requirements:
- The referenced template must exist
- The template must not have any volume mounts (volumes are stateful)

Pool creation is subject to quota limits. The total resource usage
(replicas * per-replica resources) is checked against the organization's
quota limits.
- [Create a SandboxTemplate](https://docs.langchain.com/api-reference/sandboxes-v2/create-a-sandboxtemplate.md): Create a new SandboxTemplate in tenant's namespace.
- [Create a Volume](https://docs.langchain.com/api-reference/sandboxes-v2/create-a-volume.md): Create a new persistent volume in the tenant's sandbox namespace.

This creates both a PersistentVolume (PV) and PersistentVolumeClaim (PVC).
The volume can then be referenced in sandbox templates.

Volume creation is subject to quota limits (count and total storage)
configured via Metronome org config.

If wait_for_ready is True (default), this blocks until the PVC is bound
or the timeout is reached.
- [Delete a Sandbox](https://docs.langchain.com/api-reference/sandboxes-v2/delete-a-sandbox.md): Delete a SandboxClaim from tenant's namespace.
- [Delete a Sandbox Pool](https://docs.langchain.com/api-reference/sandboxes-v2/delete-a-sandbox-pool.md): Delete a Sandbox Pool from tenant's namespace.

This will terminate all sandboxes in the pool.
- [Delete a SandboxTemplate](https://docs.langchain.com/api-reference/sandboxes-v2/delete-a-sandboxtemplate.md): Delete a SandboxTemplate from tenant's namespace.

Deletion will fail if the template is in use by any sandboxes or pools.
- [Delete a Volume](https://docs.langchain.com/api-reference/sandboxes-v2/delete-a-volume.md): Delete a persistent volume (both PV and PVC) from tenant's namespace.

This will fail if any templates reference this volume. Delete or update
those templates first before deleting the volume.
- [Get a Sandbox](https://docs.langchain.com/api-reference/sandboxes-v2/get-a-sandbox.md): Get a specific Sandbox by name in tenant's namespace.

This endpoint queries the database for fast performance.
- [Get a Sandbox Pool](https://docs.langchain.com/api-reference/sandboxes-v2/get-a-sandbox-pool.md): Get a specific Sandbox Pool by name in tenant's namespace.

This endpoint queries the database for fast performance.
- [Get a SandboxTemplate](https://docs.langchain.com/api-reference/sandboxes-v2/get-a-sandboxtemplate.md): Get a specific SandboxTemplate by name in tenant's namespace.

This endpoint queries the database for fast performance.
- [Get a Volume](https://docs.langchain.com/api-reference/sandboxes-v2/get-a-volume.md): Get a specific volume by name in the tenant's sandbox namespace.

This endpoint queries the database for fast performance.
- [List all Sandbox Pools](https://docs.langchain.com/api-reference/sandboxes-v2/list-all-sandbox-pools.md): List all Sandbox Pools in the tenant's namespace.

This endpoint queries the database for fast performance.
- [List all Sandboxes](https://docs.langchain.com/api-reference/sandboxes-v2/list-all-sandboxes.md): List all Sandboxes in the tenant's namespace.

This endpoint queries the database for fast performance.
- [List all SandboxTemplates](https://docs.langchain.com/api-reference/sandboxes-v2/list-all-sandboxtemplates.md): List all SandboxTemplates in the tenant's sandbox namespace.

This endpoint queries the database for fast performance.
- [List all Volumes](https://docs.langchain.com/api-reference/sandboxes-v2/list-all-volumes.md): List all persistent volumes in the tenant's sandbox namespace.

This endpoint queries the database for fast performance.
- [Update a Sandbox](https://docs.langchain.com/api-reference/sandboxes-v2/update-a-sandbox.md): Update a Sandbox's display name.

Currently only the display name can be updated.
- [Update a Sandbox Pool](https://docs.langchain.com/api-reference/sandboxes-v2/update-a-sandbox-pool.md): Update a Sandbox Pool's display name and/or replica count.

You can update:
- **name**: New display name (must be unique within the organization)
- **replicas**: New replica count (scaling up is subject to quota limits)

The template reference cannot be changed after creation.
Set replicas to 0 to pause the pool without deleting it.
- [Update a SandboxTemplate](https://docs.langchain.com/api-reference/sandboxes-v2/update-a-sandboxtemplate.md): Update a SandboxTemplate's display name.

Currently only the display name can be updated. The image, resources,
and volume mounts cannot be changed after creation.
- [Update a Volume](https://docs.langchain.com/api-reference/sandboxes-v2/update-a-volume.md): Update a volume's display name and/or storage size.

You can update:
- **name**: New display name (must be unique within the organization)
- **size**: New storage size (only increases allowed, cannot decrease)

The storage increase is subject to quota limits configured via
Metronome org config.
- [null](https://docs.langchain.com/index.md)
- [Connect an authentication provider](https://docs.langchain.com/langsmith/add-auth-server.md)
- [Human-in-the-loop using server API](https://docs.langchain.com/langsmith/add-human-in-the-loop.md)
- [Add metadata and tags to traces](https://docs.langchain.com/langsmith/add-metadata-tags.md)
- [Overview](https://docs.langchain.com/langsmith/administration-overview.md)
- [Set up Agent Auth (Beta)](https://docs.langchain.com/langsmith/agent-auth.md): Enable secure access from agents to any system using OAuth 2.0 credentials with Agent Auth.
- [LangSmith Agent Builder](https://docs.langchain.com/langsmith/agent-builder.md): Create helpful AI agents without code. Start from a template, connect your accounts, and let the agent handle routine work while you stay in control.
- [Auth-aware tool responses](https://docs.langchain.com/langsmith/agent-builder-auth-format.md): Format tool responses to trigger OAuth flows and resume execution automatically.
- [Call agents from code](https://docs.langchain.com/langsmith/agent-builder-code.md): Invoke Agent Builder agents from Python or JavaScript using the LangGraph SDK.
- [Essentials](https://docs.langchain.com/langsmith/agent-builder-essentials.md): Agent Builder's core features
- [LangSmith Tool Server](https://docs.langchain.com/langsmith/agent-builder-mcp-framework.md)
- [Pricing FAQ](https://docs.langchain.com/langsmith/agent-builder-pricing-faq.md)
- [Quickstart](https://docs.langchain.com/langsmith/agent-builder-quickstart.md): Build an agent from a template
- [Remote MCP servers](https://docs.langchain.com/langsmith/agent-builder-remote-mcp-servers.md): Connect Agent Builder to popular remote MCP servers
- [Enable Agent Builder](https://docs.langchain.com/langsmith/agent-builder-self-hosted.md)
- [Workspace setup](https://docs.langchain.com/langsmith/agent-builder-setup.md): Add required workspace secrets for models and tools used by Agent Builder.
- [LangSmith Agent Builder App for Slack](https://docs.langchain.com/langsmith/agent-builder-slack-app.md): Connect the LangSmith Agent Builder to your Slack workspace to power AI agents.
- [Templates](https://docs.langchain.com/langsmith/agent-builder-templates.md): Start faster with curated Agent Builder templates and customize tools, prompts, and triggers.
- [Built-in tools](https://docs.langchain.com/langsmith/agent-builder-tools.md)
- [Agent visibility](https://docs.langchain.com/langsmith/agent-builder-visibility.md): Understand the differences between private and workspace agents in Agent Builder.
- [Agent Builder webhooks](https://docs.langchain.com/langsmith/agent-builder-webhooks.md): Integrate agent publishing with external systems, CI/CD pipelines, or custom deployment workflows.
- [Agent Server](https://docs.langchain.com/langsmith/agent-server.md)
- [A2A JSON-RPC](https://docs.langchain.com/langsmith/agent-server-api/a2a/a2a-json-rpc.md): Communicate with an assistant using the Agent-to-Agent (A2A) Protocol over JSON-RPC 2.0.
This endpoint accepts a JSON-RPC envelope and dispatches based on `method`.

**Supported Methods:**
- `message/send`: Send a message and wait for the final Task result.
- `message/stream`: Send a message and receive Server-Sent Events (SSE) JSON-RPC responses.
- `tasks/get`: Fetch the current state of a Task by ID.
- `tasks/cancel`: Request cancellation (currently not supported; returns an error).

**LangGraph Mapping:**
- `message.contextId` maps to LangGraph `thread_id`.

**Notes:**
- Only `text` and `data` parts are supported; `file` parts are not.
- If `message.contextId` is omitted, a new context is created.
- Text parts require the assistant input schema to include a `messages` field.

- [Count Assistants](https://docs.langchain.com/langsmith/agent-server-api/assistants/count-assistants.md): Get the count of assistants matching the specified criteria.
- [Create Assistant](https://docs.langchain.com/langsmith/agent-server-api/assistants/create-assistant.md): Create an assistant.

An initial version of the assistant will be created and the assistant is set to that version. To change versions, use the `POST /assistants/{assistant_id}/latest` endpoint.
- [Delete Assistant](https://docs.langchain.com/langsmith/agent-server-api/assistants/delete-assistant.md): Delete an assistant by ID.

All versions of the assistant will be deleted as well.
- [Get Assistant](https://docs.langchain.com/langsmith/agent-server-api/assistants/get-assistant.md): Get an assistant by ID.
- [Get Assistant Graph](https://docs.langchain.com/langsmith/agent-server-api/assistants/get-assistant-graph.md): Get an assistant by ID.
- [Get Assistant Schemas](https://docs.langchain.com/langsmith/agent-server-api/assistants/get-assistant-schemas.md): Get an assistant by ID.
- [Get Assistant Subgraphs](https://docs.langchain.com/langsmith/agent-server-api/assistants/get-assistant-subgraphs.md): Get an assistant's subgraphs.
- [Get Assistant Subgraphs by Namespace](https://docs.langchain.com/langsmith/agent-server-api/assistants/get-assistant-subgraphs-by-namespace.md): Get an assistant's subgraphs filtered by namespace.
- [Get Assistant Versions](https://docs.langchain.com/langsmith/agent-server-api/assistants/get-assistant-versions.md): Get all versions of an assistant.
- [Patch Assistant](https://docs.langchain.com/langsmith/agent-server-api/assistants/patch-assistant.md): Update an assistant.
- [Search Assistants](https://docs.langchain.com/langsmith/agent-server-api/assistants/search-assistants.md): Search for assistants.

This endpoint also functions as the endpoint to list all assistants.
- [Set Latest Assistant Version](https://docs.langchain.com/langsmith/agent-server-api/assistants/set-latest-assistant-version.md): Set the latest version for an assistant.
- [Count Crons](https://docs.langchain.com/langsmith/agent-server-api/crons-plus-tier/count-crons.md): Get the count of crons matching the specified criteria.
- [Create Cron](https://docs.langchain.com/langsmith/agent-server-api/crons-plus-tier/create-cron.md): Create a cron to schedule runs on new threads.
- [Create Thread Cron](https://docs.langchain.com/langsmith/agent-server-api/crons-plus-tier/create-thread-cron.md): Create a cron to schedule runs on a thread.
- [Delete Cron](https://docs.langchain.com/langsmith/agent-server-api/crons-plus-tier/delete-cron.md): Delete a cron by ID.
- [Search Crons](https://docs.langchain.com/langsmith/agent-server-api/crons-plus-tier/search-crons.md): Search all active crons
- [MCP Get](https://docs.langchain.com/langsmith/agent-server-api/mcp/mcp-get.md): Implemented according to the Streamable HTTP Transport specification.
- [MCP Post](https://docs.langchain.com/langsmith/agent-server-api/mcp/mcp-post.md): Implemented according to the Streamable HTTP Transport specification.
Sends a JSON-RPC 2.0 message to the server.

- **Request**: Provide an object with `jsonrpc`, `id`, `method`, and optional `params`.
- **Response**: Returns a JSON-RPC response or acknowledgment.

**Notes:**
- Stateless: Sessions are not persisted across requests.

- [Terminate Session](https://docs.langchain.com/langsmith/agent-server-api/mcp/terminate-session.md): Implemented according to the Streamable HTTP Transport specification.
Terminate an MCP session. The server implementation is stateless, so this is a no-op.


- [Create Background Run](https://docs.langchain.com/langsmith/agent-server-api/stateless-runs/create-background-run.md): Create a run and return the run ID immediately. Don't wait for the final run output.
- [Create Run Batch](https://docs.langchain.com/langsmith/agent-server-api/stateless-runs/create-run-batch.md): Create a batch of runs and return immediately.
- [Create Run, Stream Output](https://docs.langchain.com/langsmith/agent-server-api/stateless-runs/create-run-stream-output.md): Create a run and stream the output.
- [Create Run, Wait for Output](https://docs.langchain.com/langsmith/agent-server-api/stateless-runs/create-run-wait-for-output.md): Create a run, wait for the final output and then return it.
- [Delete an item.](https://docs.langchain.com/langsmith/agent-server-api/store/delete-an-item.md)
- [List namespaces with optional match conditions.](https://docs.langchain.com/langsmith/agent-server-api/store/list-namespaces-with-optional-match-conditions.md)
- [Retrieve a single item.](https://docs.langchain.com/langsmith/agent-server-api/store/retrieve-a-single-item.md)
- [Search for items within a namespace prefix.](https://docs.langchain.com/langsmith/agent-server-api/store/search-for-items-within-a-namespace-prefix.md)
- [Store or update an item.](https://docs.langchain.com/langsmith/agent-server-api/store/store-or-update-an-item.md)
- [Health Check](https://docs.langchain.com/langsmith/agent-server-api/system/health-check.md): Check the health status of the server. Optionally check database connectivity.
- [Server Information](https://docs.langchain.com/langsmith/agent-server-api/system/server-information.md): Get server version information, feature flags, and metadata.
- [System Metrics](https://docs.langchain.com/langsmith/agent-server-api/system/system-metrics.md): Get system metrics in Prometheus or JSON format for monitoring and observability.
- [Cancel Run](https://docs.langchain.com/langsmith/agent-server-api/thread-runs/cancel-run.md)
- [Cancel Runs](https://docs.langchain.com/langsmith/agent-server-api/thread-runs/cancel-runs.md): Cancel one or more runs. Can cancel runs by thread ID and run IDs, or by status filter.
- [Create Background Run](https://docs.langchain.com/langsmith/agent-server-api/thread-runs/create-background-run.md): Create a run in existing thread, return the run ID immediately. Don't wait for the final run output.
- [Create Run, Stream Output](https://docs.langchain.com/langsmith/agent-server-api/thread-runs/create-run-stream-output.md): Create a run in existing thread. Stream the output.
- [Create Run, Wait for Output](https://docs.langchain.com/langsmith/agent-server-api/thread-runs/create-run-wait-for-output.md): Create a run in existing thread. Wait for the final output and then return it.
- [Delete Run](https://docs.langchain.com/langsmith/agent-server-api/thread-runs/delete-run.md): Delete a run by ID.
- [Get Run](https://docs.langchain.com/langsmith/agent-server-api/thread-runs/get-run.md): Get a run by ID.
- [Join Run](https://docs.langchain.com/langsmith/agent-server-api/thread-runs/join-run.md): Wait for a run to finish.
- [Join Run Stream](https://docs.langchain.com/langsmith/agent-server-api/thread-runs/join-run-stream.md): Join a run stream. This endpoint streams output in real-time from a run similar to the /threads/__THREAD_ID__/runs/stream endpoint. If the run has been created with `stream_resumable=true`, the stream can be resumed from the last seen event ID.
- [List Runs](https://docs.langchain.com/langsmith/agent-server-api/thread-runs/list-runs.md): List runs for a thread.
- [Copy Thread](https://docs.langchain.com/langsmith/agent-server-api/threads/copy-thread.md): Create a new thread with a copy of the state and checkpoints from an existing thread.
- [Count Threads](https://docs.langchain.com/langsmith/agent-server-api/threads/count-threads.md): Get the count of threads matching the specified criteria.
- [Create Thread](https://docs.langchain.com/langsmith/agent-server-api/threads/create-thread.md): Create a thread.
- [Delete Thread](https://docs.langchain.com/langsmith/agent-server-api/threads/delete-thread.md): Delete a thread by ID.
- [Get Thread](https://docs.langchain.com/langsmith/agent-server-api/threads/get-thread.md): Get a thread by ID.
- [Get Thread History](https://docs.langchain.com/langsmith/agent-server-api/threads/get-thread-history.md): Get all past states for a thread.
- [Get Thread History Post](https://docs.langchain.com/langsmith/agent-server-api/threads/get-thread-history-post.md): Get all past states for a thread.
- [Get Thread State](https://docs.langchain.com/langsmith/agent-server-api/threads/get-thread-state.md): Get state for a thread.

The latest state of the thread (i.e. latest checkpoint) is returned.
- [Get Thread State At Checkpoint](https://docs.langchain.com/langsmith/agent-server-api/threads/get-thread-state-at-checkpoint.md): Get state for a thread at a specific checkpoint.
- [Get Thread State At Checkpoint](https://docs.langchain.com/langsmith/agent-server-api/threads/get-thread-state-at-checkpoint-1.md): Get state for a thread at a specific checkpoint.
- [Join Thread Stream](https://docs.langchain.com/langsmith/agent-server-api/threads/join-thread-stream.md): This endpoint streams output in real-time from a thread. The stream will include the output of each run executed sequentially on the thread and will remain open indefinitely. It is the responsibility of the calling client to close the connection.
- [Patch Thread](https://docs.langchain.com/langsmith/agent-server-api/threads/patch-thread.md): Update a thread.
- [Prune Threads](https://docs.langchain.com/langsmith/agent-server-api/threads/prune-threads.md): Prune threads by ID. The 'delete' strategy removes threads entirely. The 'keep_latest' strategy prunes old checkpoints but keeps threads and their latest state (requires FF_USE_CORE_API=true).
- [Search Threads](https://docs.langchain.com/langsmith/agent-server-api/threads/search-threads.md): Search for threads.

This endpoint also functions as the endpoint to list all threads.
- [Update Thread State](https://docs.langchain.com/langsmith/agent-server-api/threads/update-thread-state.md): Add state to a thread.
- [Agent Server changelog](https://docs.langchain.com/langsmith/agent-server-changelog.md)
- [Distributed tracing with Agent Server](https://docs.langchain.com/langsmith/agent-server-distributed-tracing.md): Unify traces when calling your deployed Agent Server from another service using RemoteGraph or the SDK.
- [Configure LangSmith Agent Server for scale](https://docs.langchain.com/langsmith/agent-server-scale.md)
- [Alerts in LangSmith](https://docs.langchain.com/langsmith/alerts.md)
- [Configure webhook notifications for LangSmith alerts](https://docs.langchain.com/langsmith/alerts-webhook.md)
- [Analyze an experiment](https://docs.langchain.com/langsmith/analyze-an-experiment.md)
- [Custom instrumentation](https://docs.langchain.com/langsmith/annotate-code.md)
- [Annotate traces and runs inline](https://docs.langchain.com/langsmith/annotate-traces-inline.md)
- [Use annotation queues](https://docs.langchain.com/langsmith/annotation-queues.md)
- [Control plane API reference for LangSmith Deployment](https://docs.langchain.com/langsmith/api-ref-control-plane.md)
- [App development in LangSmith Deployment](https://docs.langchain.com/langsmith/app-development.md)
- [Application structure](https://docs.langchain.com/langsmith/application-structure.md)
- [Assistants](https://docs.langchain.com/langsmith/assistants.md)
- [Log user feedback using the SDK](https://docs.langchain.com/langsmith/attach-user-feedback.md)
- [How to audit evaluator scores](https://docs.langchain.com/langsmith/audit-evaluator-scores.md)
- [Authentication & access control](https://docs.langchain.com/langsmith/auth.md)
- [Authentication methods](https://docs.langchain.com/langsmith/authentication-methods.md)
- [Self-hosted LangSmith on AWS](https://docs.langchain.com/langsmith/aws-self-hosted.md)
- [Self-hosted LangSmith on Azure](https://docs.langchain.com/langsmith/azure-self-hosted.md)
- [How to kick off background runs](https://docs.langchain.com/langsmith/background-run.md)
- [Manage billing in your account](https://docs.langchain.com/langsmith/billing.md)
- [Automatically run evaluators on experiments](https://docs.langchain.com/langsmith/bind-evaluator-to-dataset.md)
- [Implement a CI/CD pipeline using LangSmith Deployment and Evaluation](https://docs.langchain.com/langsmith/cicd-pipeline-example.md)
- [LangGraph CLI](https://docs.langchain.com/langsmith/cli.md)
- [Cloud](https://docs.langchain.com/langsmith/cloud.md)
- [How to define a code evaluator](https://docs.langchain.com/langsmith/code-evaluator-sdk.md)
- [How to define a code evaluator](https://docs.langchain.com/langsmith/code-evaluator-ui.md)
- [Beta LangSmith Collector-Proxy](https://docs.langchain.com/langsmith/collector-proxy.md)
- [How to compare experiment results](https://docs.langchain.com/langsmith/compare-experiment-results.md)
- [Compare traces](https://docs.langchain.com/langsmith/compare-traces.md)
- [LangSmith Deployment components](https://docs.langchain.com/langsmith/components.md)
- [How to create a composite evaluator](https://docs.langchain.com/langsmith/composite-evaluators-sdk.md)
- [How to create a composite evaluator](https://docs.langchain.com/langsmith/composite-evaluators-ui.md)
- [Use HTTP headers for runtime configuration](https://docs.langchain.com/langsmith/configurable-headers.md)
- [Include HTTP headers in server logs](https://docs.langchain.com/langsmith/configurable-logs.md)
- [Manage assistants](https://docs.langchain.com/langsmith/configuration-cloud.md)
- [How to add TTLs to your application](https://docs.langchain.com/langsmith/configure-ttl.md)
- [LangSmith control plane](https://docs.langchain.com/langsmith/control-plane.md)
- [Cost tracking](https://docs.langchain.com/langsmith/cost-tracking.md)
- [Create a prompt](https://docs.langchain.com/langsmith/create-a-prompt.md)
- [Create an account and API key](https://docs.langchain.com/langsmith/create-account-api-key.md)
- [How to improve your evaluator with few-shot examples](https://docs.langchain.com/langsmith/create-few-shot-evaluators.md)
- [Use cron jobs](https://docs.langchain.com/langsmith/cron-jobs.md)
- [Add custom authentication](https://docs.langchain.com/langsmith/custom-auth.md)
- [How to customize the Dockerfile](https://docs.langchain.com/langsmith/custom-docker.md)
- [Connect to a custom model](https://docs.langchain.com/langsmith/custom-endpoint.md)
- [How to add custom lifespan events](https://docs.langchain.com/langsmith/custom-lifespan.md)
- [How to add custom middleware](https://docs.langchain.com/langsmith/custom-middleware.md)
- [Connect to an OpenAI compliant model provider/proxy](https://docs.langchain.com/langsmith/custom-openai-compliant-model.md)
- [Custom output rendering](https://docs.langchain.com/langsmith/custom-output-rendering.md)
- [How to add custom routes](https://docs.langchain.com/langsmith/custom-routes.md)
- [Monitor projects with dashboards](https://docs.langchain.com/langsmith/dashboards.md)
- [Bulk exporting trace data](https://docs.langchain.com/langsmith/data-export.md)
- [LangSmith data plane](https://docs.langchain.com/langsmith/data-plane.md)
- [Data purging for compliance](https://docs.langchain.com/langsmith/data-purging-compliance.md)
- [Data storage and privacy](https://docs.langchain.com/langsmith/data-storage-and-privacy.md)
- [Dataset prebuilt JSON schema types](https://docs.langchain.com/langsmith/dataset-json-types.md)
- [Dataset transformations](https://docs.langchain.com/langsmith/dataset-transformations.md)
- [How to define a target function to evaluate](https://docs.langchain.com/langsmith/define-target-function.md)
- [Set up hybrid LangSmith](https://docs.langchain.com/langsmith/deploy-hybrid.md)
- [Deploy other frameworks](https://docs.langchain.com/langsmith/deploy-other-frameworks.md)
- [Enable LangSmith Deployment](https://docs.langchain.com/langsmith/deploy-self-hosted-full-platform.md)
- [Self-host standalone servers](https://docs.langchain.com/langsmith/deploy-standalone-server.md)
- [Deploy on Cloud](https://docs.langchain.com/langsmith/deploy-to-cloud.md)
- [Deploy with control plane](https://docs.langchain.com/langsmith/deploy-with-control-plane.md)
- [Deploy your app to Cloud](https://docs.langchain.com/langsmith/deployment-quickstart.md)
- [LangSmith Deployment](https://docs.langchain.com/langsmith/deployments.md): _Build and deploy your agents and applications as [Agent Servers](/langsmith/agent-server)_
- [Troubleshooting for self-hosted deployments](https://docs.langchain.com/langsmith/diagnostics-self-hosted.md)
- [Implement distributed tracing](https://docs.langchain.com/langsmith/distributed-tracing.md)
- [Self-host LangSmith with Docker](https://docs.langchain.com/langsmith/docker.md)
- [Double texting](https://docs.langchain.com/langsmith/double-texting.md)
- [Add encryption at-rest](https://docs.langchain.com/langsmith/encryption.md)
- [Enqueue concurrent](https://docs.langchain.com/langsmith/enqueue-concurrent.md)
- [Environment variables](https://docs.langchain.com/langsmith/env-var.md)
- [Evaluate a chatbot](https://docs.langchain.com/langsmith/evaluate-chatbot-tutorial.md)
- [Evaluate a complex agent](https://docs.langchain.com/langsmith/evaluate-complex-agent.md)
- [How to add evaluators to an existing experiment (Python only)](https://docs.langchain.com/langsmith/evaluate-existing-experiment.md)
- [How to evaluate a graph](https://docs.langchain.com/langsmith/evaluate-graph.md)
- [How to evaluate an LLM application](https://docs.langchain.com/langsmith/evaluate-llm-application.md)
- [How to evaluate an application's intermediate steps](https://docs.langchain.com/langsmith/evaluate-on-intermediate-steps.md)
- [How to run a pairwise evaluation](https://docs.langchain.com/langsmith/evaluate-pairwise.md)
- [Evaluate a RAG application](https://docs.langchain.com/langsmith/evaluate-rag-tutorial.md)
- [Run an evaluation with multimodal content](https://docs.langchain.com/langsmith/evaluate-with-attachments.md)
- [How to retry failed runs in experiments (Python only)](https://docs.langchain.com/langsmith/evaluate-with-retry.md)
- [LangSmith Evaluation](https://docs.langchain.com/langsmith/evaluation.md)
- [Application-specific evaluation approaches](https://docs.langchain.com/langsmith/evaluation-approaches.md)
- [How to run an evaluation asynchronously](https://docs.langchain.com/langsmith/evaluation-async.md)
- [Evaluation concepts](https://docs.langchain.com/langsmith/evaluation-concepts.md)
- [Evaluation quickstart](https://docs.langchain.com/langsmith/evaluation-quickstart.md)
- [Evaluation types](https://docs.langchain.com/langsmith/evaluation-types.md)
- [Example data format](https://docs.langchain.com/langsmith/example-data-format.md)
- [Experiment configuration](https://docs.langchain.com/langsmith/experiment-configuration.md)
- [Export LangSmith telemetry to your observability backend](https://docs.langchain.com/langsmith/export-backend.md)
- [Query traces (SDK)](https://docs.langchain.com/langsmith/export-traces.md)
- [Frequently asked questions](https://docs.langchain.com/langsmith/faq.md)
- [Feedback data format](https://docs.langchain.com/langsmith/feedback-data-format.md)
- [How to fetch performance metrics for an experiment](https://docs.langchain.com/langsmith/fetch-perf-metrics-experiment.md)
- [How to filter experiments in the UI](https://docs.langchain.com/langsmith/filter-experiments-ui.md)
- [Filter traces](https://docs.langchain.com/langsmith/filter-traces-in-application.md)
- [Self-hosted LangSmith on GCP](https://docs.langchain.com/langsmith/gcp-self-hosted.md)
- [How to implement generative user interfaces with LangGraph](https://docs.langchain.com/langsmith/generative-ui-react.md)
- [Granular billable usage](https://docs.langchain.com/langsmith/granular-usage.md): Retrieve detailed trace usage data broken down by workspace, project, user, or API key.
- [Rebuild graph at runtime](https://docs.langchain.com/langsmith/graph-rebuild.md)
- [LangSmith docs](https://docs.langchain.com/langsmith/home.md)
- [Time travel using the server API](https://docs.langchain.com/langsmith/human-in-the-loop-time-travel.md)
- [Hybrid](https://docs.langchain.com/langsmith/hybrid.md)
- [Improve LLM-as-judge evaluators using human feedback](https://docs.langchain.com/langsmith/improve-judge-evaluator-feedback.md)
- [Dynamic few shot example selection](https://docs.langchain.com/langsmith/index-datasets-for-dynamic-few-shot-example-selection.md)
- [Discover errors and usage patterns with the Insights Agent](https://docs.langchain.com/langsmith/insights.md)
- [Enable Insights](https://docs.langchain.com/langsmith/insights-self-hosted.md)
- [Integrations](https://docs.langchain.com/langsmith/integrations.md)
- [Interrupt concurrent](https://docs.langchain.com/langsmith/interrupt-concurrent.md)
- [Self-host LangSmith on Kubernetes](https://docs.langchain.com/langsmith/kubernetes.md)
- [How to evaluate a runnable](https://docs.langchain.com/langsmith/langchain-runnable.md)
- [LangGraph JS/TS SDK](https://docs.langchain.com/langsmith/langgraph-js-ts-sdk.md)
- [LangGraph Python SDK](https://docs.langchain.com/langsmith/langgraph-python-sdk.md)
- [Configure your collector for LangSmith telemetry](https://docs.langchain.com/langsmith/langsmith-collector.md)
- [LangSmith Fetch](https://docs.langchain.com/langsmith/langsmith-fetch.md)
- [LangSmith-managed ClickHouse](https://docs.langchain.com/langsmith/langsmith-managed-clickhouse.md)
- [How to define an LLM-as-a-judge evaluator](https://docs.langchain.com/langsmith/llm-as-judge.md)
- [How to define an LLM-as-a-judge evaluator](https://docs.langchain.com/langsmith/llm-as-judge-sdk.md)
- [How to run an evaluation locally (Python only)](https://docs.langchain.com/langsmith/local.md)
- [Local development & testing](https://docs.langchain.com/langsmith/local-dev-testing.md)
- [Run a LangGraph app locally](https://docs.langchain.com/langsmith/local-server.md)
- [Log LLM calls](https://docs.langchain.com/langsmith/log-llm-trace.md)
- [Log multimodal traces](https://docs.langchain.com/langsmith/log-multimodal-traces.md)
- [Log retriever traces](https://docs.langchain.com/langsmith/log-retriever-trace.md)
- [Log traces to a specific project](https://docs.langchain.com/langsmith/log-traces-to-project.md)
- [Metadata parameters reference](https://docs.langchain.com/langsmith/ls-metadata-parameters.md)
- [Manage datasets](https://docs.langchain.com/langsmith/manage-datasets.md)
- [Create and manage datasets in the UI](https://docs.langchain.com/langsmith/manage-datasets-in-application.md)
- [How to create and manage datasets programmatically](https://docs.langchain.com/langsmith/manage-datasets-programmatically.md)
- [Manage your organization using the API](https://docs.langchain.com/langsmith/manage-organization-by-api.md)
- [Manage prompts](https://docs.langchain.com/langsmith/manage-prompts.md)
- [Manage prompts programmatically](https://docs.langchain.com/langsmith/manage-prompts-programmatically.md)
- [Configure prompt settings](https://docs.langchain.com/langsmith/managing-model-configurations.md)
- [Prevent logging of sensitive data in traces](https://docs.langchain.com/langsmith/mask-inputs-outputs.md)
- [How to return categorical vs numerical metrics](https://docs.langchain.com/langsmith/metric-type.md)
- [Monorepo support](https://docs.langchain.com/langsmith/monorepo-support.md)
- [How to simulate multi-turn interactions](https://docs.langchain.com/langsmith/multi-turn-simulation.md)
- [Include multimodal content in a prompt](https://docs.langchain.com/langsmith/multimodal-content.md)
- [Test multi-turn conversations](https://docs.langchain.com/langsmith/multiple-messages.md)
- [How to return multiple scores in one evaluator](https://docs.langchain.com/langsmith/multiple-scores.md)
- [Troubleshoot trace nesting](https://docs.langchain.com/langsmith/nest-traces.md)
- [LangSmith Observability](https://docs.langchain.com/langsmith/observability.md)
- [Observability concepts](https://docs.langchain.com/langsmith/observability-concepts.md)
- [Trace a RAG application tutorial](https://docs.langchain.com/langsmith/observability-llm-tutorial.md)
- [Tracing quickstart](https://docs.langchain.com/langsmith/observability-quickstart.md)
- [Deploy an observability stack for your LangSmith deployment](https://docs.langchain.com/langsmith/observability-stack.md)
- [Observability in Studio](https://docs.langchain.com/langsmith/observability-studio.md)
- [Set up online code evaluators](https://docs.langchain.com/langsmith/online-evaluations-code.md)
- [Set up composite online evaluators](https://docs.langchain.com/langsmith/online-evaluations-composite.md)
- [Set up LLM-as-a-judge online evaluators](https://docs.langchain.com/langsmith/online-evaluations-llm-as-judge.md)
- [Set up multi-turn online evaluators](https://docs.langchain.com/langsmith/online-evaluations-multi-turn.md)
- [Document API authentication in OpenAPI](https://docs.langchain.com/langsmith/openapi-security.md)
- [Optimize a classifier](https://docs.langchain.com/langsmith/optimize-classifier.md)
- [Organization and workspace operations reference](https://docs.langchain.com/langsmith/organization-workspace-operations.md)
- [View server logs for a trace](https://docs.langchain.com/langsmith/platform-logs.md)
- [Set up LangSmith](https://docs.langchain.com/langsmith/platform-setup.md)
- [LangSmith Polly](https://docs.langchain.com/langsmith/polly.md)
- [How to use prebuilt evaluators](https://docs.langchain.com/langsmith/prebuilt-evaluators.md)
- [Frequently Asked Questions](https://docs.langchain.com/langsmith/pricing-faq.md)
- [Pricing plans](https://docs.langchain.com/langsmith/pricing-plans.md)
- [How to sync prompts with GitHub](https://docs.langchain.com/langsmith/prompt-commit.md)
- [Prompt engineering](https://docs.langchain.com/langsmith/prompt-engineering.md)
- [Prompt engineering concepts](https://docs.langchain.com/langsmith/prompt-engineering-concepts.md)
- [Prompt engineering quickstart](https://docs.langchain.com/langsmith/prompt-engineering-quickstart.md)
- [Prompt template format guide](https://docs.langchain.com/langsmith/prompt-template-format.md)
- [How to run evaluations with pytest](https://docs.langchain.com/langsmith/pytest.md)
- [Get started with Studio](https://docs.langchain.com/langsmith/quick-start-studio.md)
- [How to handle model rate limits](https://docs.langchain.com/langsmith/rate-limiting.md)
- [Role-based access control](https://docs.langchain.com/langsmith/rbac.md)
- [How to read experiment results locally](https://docs.langchain.com/langsmith/read-local-experiment-results.md)
- [LangSmith reference](https://docs.langchain.com/langsmith/reference.md)
- [Regions FAQ](https://docs.langchain.com/langsmith/regions-faq.md)
- [Reject Concurrent](https://docs.langchain.com/langsmith/reject-concurrent.md)
- [Release versions](https://docs.langchain.com/langsmith/release-versions.md)
- [RemoteGraph](https://docs.langchain.com/langsmith/remote-graph.md)
- [How to evaluate with repetitions](https://docs.langchain.com/langsmith/repetition.md)
- [Make conversations private](https://docs.langchain.com/langsmith/resource-auth.md)
- [Rollback Concurrent](https://docs.langchain.com/langsmith/rollback-concurrent.md)
- [Set up automation rules](https://docs.langchain.com/langsmith/rules.md)
- [Run backtests on a new version of an agent](https://docs.langchain.com/langsmith/run-backtests-new-agent.md)
- [Run (span) data format](https://docs.langchain.com/langsmith/run-data-format.md)
- [How to use the REST API](https://docs.langchain.com/langsmith/run-evals-api-only.md)
- [Run an evaluation from the prompt playground](https://docs.langchain.com/langsmith/run-evaluation-from-prompt-playground.md)
- [How to run multiple agents on the same thread](https://docs.langchain.com/langsmith/same-thread.md)
- [Set a sampling rate for traces](https://docs.langchain.com/langsmith/sample-traces.md)
- [Scalability & resilience](https://docs.langchain.com/langsmith/scalability-and-resilience.md)
- [Delete workspaces](https://docs.langchain.com/langsmith/script-delete-a-workspace.md)
- [Delete organizations](https://docs.langchain.com/langsmith/script-delete-an-organization.md)
- [Delete traces](https://docs.langchain.com/langsmith/script-delete-traces.md)
- [Generate ClickHouse stats](https://docs.langchain.com/langsmith/script-generate-clickhouse-stats.md)
- [Generate query stats](https://docs.langchain.com/langsmith/script-generate-query-stats.md)
- [Run support queries against ClickHouse](https://docs.langchain.com/langsmith/script-running-ch-support-queries.md)
- [Run support queries against PostgreSQL](https://docs.langchain.com/langsmith/script-running-pg-support-queries.md)
- [Basic authentication with email and password](https://docs.langchain.com/langsmith/self-host-basic-auth.md)
- [Enable blob storage](https://docs.langchain.com/langsmith/self-host-blob-storage.md)
- [Configure custom TLS certificates](https://docs.langchain.com/langsmith/self-host-custom-tls-certificates.md)
- [Egress for subscription metrics and operational metadata](https://docs.langchain.com/langsmith/self-host-egress.md)
- [Connect to an external ClickHouse database](https://docs.langchain.com/langsmith/self-host-external-clickhouse.md)
- [Connect to an external PostgreSQL database](https://docs.langchain.com/langsmith/self-host-external-postgres.md)
- [Connect to an external Redis database](https://docs.langchain.com/langsmith/self-host-external-redis.md)
- [Create an Ingress for installations (Kubernetes)](https://docs.langchain.com/langsmith/self-host-ingress.md)
- [Mirror images for your LangSmith installation](https://docs.langchain.com/langsmith/self-host-mirroring-images.md)
- [View trace counts across your organization](https://docs.langchain.com/langsmith/self-host-organization-charts.md)
- [Use environment variables for model providers](https://docs.langchain.com/langsmith/self-host-playground-environment-settings.md)
- [Configure LangSmith for scale](https://docs.langchain.com/langsmith/self-host-scale.md)
- [Set up SSO with OAuth2.0 and OIDC](https://docs.langchain.com/langsmith/self-host-sso.md)
- [Enable TTL and data retention](https://docs.langchain.com/langsmith/self-host-ttl.md)
- [Upgrade an installation](https://docs.langchain.com/langsmith/self-host-upgrades.md)
- [Interact with your self-hosted instance of LangSmith](https://docs.langchain.com/langsmith/self-host-usage.md)
- [Customize user management](https://docs.langchain.com/langsmith/self-host-user-management.md)
- [Use an existing secret for your installation (Kubernetes)](https://docs.langchain.com/langsmith/self-host-using-an-existing-secret.md)
- [Self-hosted LangSmith](https://docs.langchain.com/langsmith/self-hosted.md)
- [Self-hosted LangSmith changelog](https://docs.langchain.com/langsmith/self-hosted-changelog.md)
- [How to add semantic search to your agent deployment](https://docs.langchain.com/langsmith/semantic-search.md)
- [A2A endpoint in Agent Server](https://docs.langchain.com/langsmith/server-a2a.md)
- [Agent Server API reference for LangSmith Deployment](https://docs.langchain.com/langsmith/server-api-ref.md)
- [MCP endpoint in Agent Server](https://docs.langchain.com/langsmith/server-mcp.md)
- [Trace JS functions in serverless environments](https://docs.langchain.com/langsmith/serverless-environments.md)
- [Set up custom authentication](https://docs.langchain.com/langsmith/set-up-custom-auth.md)
- [Set up feedback criteria](https://docs.langchain.com/langsmith/set-up-feedback-criteria.md)
- [Set up hierarchy](https://docs.langchain.com/langsmith/set-up-hierarchy.md)
- [Set up resource tags](https://docs.langchain.com/langsmith/set-up-resource-tags.md)
- [How to set up an application with requirements.txt](https://docs.langchain.com/langsmith/setup-app-requirements-txt.md)
- [How to set up a Java application](https://docs.langchain.com/langsmith/setup-java.md)
- [How to set up a JavaScript application](https://docs.langchain.com/langsmith/setup-javascript.md)
- [How to set up an application with pyproject.toml](https://docs.langchain.com/langsmith/setup-pyproject.md)
- [Share or unshare a trace publicly](https://docs.langchain.com/langsmith/share-trace.md)
- [LangSmith API reference](https://docs.langchain.com/langsmith/smith-api-ref.md)
- [LangSmith Deployment SDK](https://docs.langchain.com/langsmith/smith-deployments-sdk.md)
- [LangSmith JS/TS SDK](https://docs.langchain.com/langsmith/smith-js-ts-sdk.md)
- [LangSmith Python SDK](https://docs.langchain.com/langsmith/smith-python-sdk.md)
- [Stateless runs](https://docs.langchain.com/langsmith/stateless-runs.md)
- [LangSmith status](https://docs.langchain.com/langsmith/status.md)
- [Streaming API](https://docs.langchain.com/langsmith/streaming.md)
- [LangSmith Studio](https://docs.langchain.com/langsmith/studio.md)
- [How to define a summary evaluator](https://docs.langchain.com/langsmith/summary.md)
- [Test a ReAct agent with Pytest/Vitest and LangSmith](https://docs.langchain.com/langsmith/test-react-agent-pytest.md)
- [Configure threads](https://docs.langchain.com/langsmith/threads.md)
- [Trace with Anthropic](https://docs.langchain.com/langsmith/trace-anthropic.md)
- [Trace Claude Agent SDK](https://docs.langchain.com/langsmith/trace-claude-agent-sdk.md)
- [Trace Claude Code](https://docs.langchain.com/langsmith/trace-claude-code.md)
- [Trace generator functions](https://docs.langchain.com/langsmith/trace-generator-functions.md)
- [Trace with OpenAI](https://docs.langchain.com/langsmith/trace-openai.md)
- [Trace query syntax](https://docs.langchain.com/langsmith/trace-query-syntax.md)
- [Trace with API](https://docs.langchain.com/langsmith/trace-with-api.md)
- [Trace with AutoGen](https://docs.langchain.com/langsmith/trace-with-autogen.md)
- [Trace with CrewAI](https://docs.langchain.com/langsmith/trace-with-crewai.md)
- [Trace with Google ADK](https://docs.langchain.com/langsmith/trace-with-google-adk.md)
- [Trace with Instructor](https://docs.langchain.com/langsmith/trace-with-instructor.md)
- [Trace with LangChain (Python and JS/TS)](https://docs.langchain.com/langsmith/trace-with-langchain.md)
- [Trace with LangGraph](https://docs.langchain.com/langsmith/trace-with-langgraph.md)
- [Trace with LiveKit](https://docs.langchain.com/langsmith/trace-with-livekit.md)
- [Trace with Mastra](https://docs.langchain.com/langsmith/trace-with-mastra.md)
- [Trace with Microsoft Agent Framework](https://docs.langchain.com/langsmith/trace-with-microsoft-agent-framework.md)
- [Trace with OpenAI Agents SDK](https://docs.langchain.com/langsmith/trace-with-openai-agents-sdk.md)
- [Trace with OpenTelemetry](https://docs.langchain.com/langsmith/trace-with-opentelemetry.md)
- [Trace with Pipecat](https://docs.langchain.com/langsmith/trace-with-pipecat.md)
- [Trace with PydanticAI](https://docs.langchain.com/langsmith/trace-with-pydantic-ai.md)
- [Trace with Semantic Kernel](https://docs.langchain.com/langsmith/trace-with-semantic-kernel.md)
- [Trace with Temporal](https://docs.langchain.com/langsmith/trace-with-temporal.md): Learn how to trace Temporal workflows and activities in LangSmith using OpenTelemetry.
- [Trace with the Vercel AI SDK (JS/TS only)](https://docs.langchain.com/langsmith/trace-with-vercel-ai-sdk.md)
- [Trace without setting environment variables](https://docs.langchain.com/langsmith/trace-without-env-vars.md)
- [How to evaluate your agent with trajectory evaluations](https://docs.langchain.com/langsmith/trajectory-evals.md)
- [Troubleshooting](https://docs.langchain.com/langsmith/troubleshooting.md)
- [Studio troubleshooting](https://docs.langchain.com/langsmith/troubleshooting-studio.md)
- [Troubleshoot variable caching](https://docs.langchain.com/langsmith/troubleshooting-variable-caching.md)
- [How to upload experiments run outside of LangSmith with the REST API](https://docs.langchain.com/langsmith/upload-existing-experiments.md)
- [Upload files with traces](https://docs.langchain.com/langsmith/upload-files-with-traces.md)
- [How to interact with a deployment using RemoteGraph](https://docs.langchain.com/langsmith/use-remote-graph.md)
- [How to use Studio](https://docs.langchain.com/langsmith/use-studio.md)
- [Use threads](https://docs.langchain.com/langsmith/use-threads.md)
- [Use tools in a prompt](https://docs.langchain.com/langsmith/use-tools.md)
- [Use webhooks](https://docs.langchain.com/langsmith/use-webhooks.md)
- [User management](https://docs.langchain.com/langsmith/user-management.md)
- [How to run evaluations with Vitest/Jest](https://docs.langchain.com/langsmith/vitest-jest.md)
- [Configure webhook notifications for rules](https://docs.langchain.com/langsmith/webhooks.md)
- [Workload isolation](https://docs.langchain.com/langsmith/workload-isolation.md)
- [Write your prompt with AI](https://docs.langchain.com/langsmith/write-prompt-with-ai.md)
- [Errors](https://docs.langchain.com/oss/javascript/common-errors.md)
- [Context overview](https://docs.langchain.com/oss/javascript/concepts/context.md)
- [Memory overview](https://docs.langchain.com/oss/javascript/concepts/memory.md)
- [Frameworks, runtimes, and harnesses](https://docs.langchain.com/oss/javascript/concepts/products.md): Understand the differences between LangChain, LangGraph, and DeepAgents and when to use each one
- [Contributing to code](https://docs.langchain.com/oss/javascript/contributing/code.md)
- [Co-marketing](https://docs.langchain.com/oss/javascript/contributing/comarketing.md)
- [Contributing to documentation](https://docs.langchain.com/oss/javascript/contributing/documentation.md)
- [Implement a LangChain integration](https://docs.langchain.com/oss/javascript/contributing/implement-langchain.md)
- [Contributing integrations](https://docs.langchain.com/oss/javascript/contributing/integrations-langchain.md)
- [Contributing](https://docs.langchain.com/oss/javascript/contributing/overview.md)
- [Publish an integration](https://docs.langchain.com/oss/javascript/contributing/publish-langchain.md)
- [Using standard tests](https://docs.langchain.com/oss/javascript/contributing/standard-tests-langchain.md)
- [Backends](https://docs.langchain.com/oss/javascript/deepagents/backends.md): Choose and configure filesystem backends for deep agents. You can specify routes to different backends, implement virtual filesystems, and enforce policies.
- [Deep Agents CLI](https://docs.langchain.com/oss/javascript/deepagents/cli.md): Interactive command-line interface for building with Deep Agents
- [Customize Deep Agents](https://docs.langchain.com/oss/javascript/deepagents/customization.md): Learn how to customize deep agents with system prompts, tools, subagents, and more
- [Agent harness capabilities](https://docs.langchain.com/oss/javascript/deepagents/harness.md)
- [Human-in-the-loop](https://docs.langchain.com/oss/javascript/deepagents/human-in-the-loop.md): Learn how to configure human approval for sensitive tool operations
- [Long-term memory](https://docs.langchain.com/oss/javascript/deepagents/long-term-memory.md): Learn how to extend deep agents with persistent memory across threads
- [Deep Agents Middleware](https://docs.langchain.com/oss/javascript/deepagents/middleware.md): Understand the middleware that powers deep agents
- [Deep Agents overview](https://docs.langchain.com/oss/javascript/deepagents/overview.md): Build agents that can plan, use subagents, and leverage file systems for complex tasks
- [Quickstart](https://docs.langchain.com/oss/javascript/deepagents/quickstart.md): Build your first deep agent in minutes
- [Skills](https://docs.langchain.com/oss/javascript/deepagents/skills.md): Learn how to extend your deep agent's capabilities with skills
- [Subagents](https://docs.langchain.com/oss/javascript/deepagents/subagents.md): Learn how to use subagents to delegate work and keep context clean
- [Callbacks](https://docs.langchain.com/oss/javascript/integrations/callbacks/index.md)
- [ChatAnthropic](https://docs.langchain.com/oss/javascript/integrations/chat/anthropic.md)
- [AzureChatOpenAI](https://docs.langchain.com/oss/javascript/integrations/chat/azure.md)
- [BedrockChat](https://docs.langchain.com/oss/javascript/integrations/chat/bedrock.md)
- [ChatGoogleGenerativeAI](https://docs.langchain.com/oss/javascript/integrations/chat/google_generative_ai.md)
- [Chat models](https://docs.langchain.com/oss/javascript/integrations/chat/index.md)
- [ChatOpenAI](https://docs.langchain.com/oss/javascript/integrations/chat/openai.md)
- [null](https://docs.langchain.com/oss/javascript/integrations/document_loaders/index.md)
- [Document transformers](https://docs.langchain.com/oss/javascript/integrations/document_transformers/index.md)
- [Model caches](https://docs.langchain.com/oss/javascript/integrations/llm_caching/index.md)
- [LLMs](https://docs.langchain.com/oss/javascript/integrations/llms/index.md)
- [Provider-specific middleware](https://docs.langchain.com/oss/javascript/integrations/middleware/index.md)
- [All integrations](https://docs.langchain.com/oss/javascript/integrations/providers/all_providers.md)
- [Overview](https://docs.langchain.com/oss/javascript/integrations/providers/anthropic.md)
- [Overview](https://docs.langchain.com/oss/javascript/integrations/providers/aws.md)
- [Overview](https://docs.langchain.com/oss/javascript/integrations/providers/google.md)
- [Overview](https://docs.langchain.com/oss/javascript/integrations/providers/microsoft.md)
- [Overview](https://docs.langchain.com/oss/javascript/integrations/providers/openai.md)
- [Integration Packages](https://docs.langchain.com/oss/javascript/integrations/providers/overview.md)
- [Retrievers](https://docs.langchain.com/oss/javascript/integrations/retrievers/index.md)
- [Text splitters](https://docs.langchain.com/oss/javascript/integrations/splitters/index.md)
- [Key-value stores](https://docs.langchain.com/oss/javascript/integrations/stores/index.md)
- [AzureOpenAIEmbeddings](https://docs.langchain.com/oss/javascript/integrations/text_embedding/azure_openai.md)
- [BedrockEmbeddings](https://docs.langchain.com/oss/javascript/integrations/text_embedding/bedrock.md)
- [Embedding models](https://docs.langchain.com/oss/javascript/integrations/text_embedding/index.md)
- [OpenAIEmbeddings](https://docs.langchain.com/oss/javascript/integrations/text_embedding/openai.md)
- [Tools](https://docs.langchain.com/oss/javascript/integrations/tools/anthropic.md)
- [Tools and Toolkits](https://docs.langchain.com/oss/javascript/integrations/tools/index.md)
- [Tools](https://docs.langchain.com/oss/javascript/integrations/tools/openai.md)
- [Vector stores](https://docs.langchain.com/oss/javascript/integrations/vectorstores/index.md)
- [LangChain Academy](https://docs.langchain.com/oss/javascript/langchain/academy.md)
- [Agents](https://docs.langchain.com/oss/javascript/langchain/agents.md)
- [Changelog](https://docs.langchain.com/oss/javascript/langchain/changelog-js.md)
- [Component architecture](https://docs.langchain.com/oss/javascript/langchain/component-architecture.md)
- [Context engineering in agents](https://docs.langchain.com/oss/javascript/langchain/context-engineering.md)
- [LangSmith Deployment](https://docs.langchain.com/oss/javascript/langchain/deploy.md)
- [Get help](https://docs.langchain.com/oss/javascript/langchain/get-help.md)
- [Guardrails](https://docs.langchain.com/oss/javascript/langchain/guardrails.md): Implement safety checks and content filtering for your agents
- [Human-in-the-loop](https://docs.langchain.com/oss/javascript/langchain/human-in-the-loop.md)
- [Install LangChain](https://docs.langchain.com/oss/javascript/langchain/install.md)
- [Build a semantic search engine with LangChain](https://docs.langchain.com/oss/javascript/langchain/knowledge-base.md)
- [Long-term memory](https://docs.langchain.com/oss/javascript/langchain/long-term-memory.md)
- [Model Context Protocol (MCP)](https://docs.langchain.com/oss/javascript/langchain/mcp.md)
- [Messages](https://docs.langchain.com/oss/javascript/langchain/messages.md)
- [Built-in middleware](https://docs.langchain.com/oss/javascript/langchain/middleware/built-in.md): Prebuilt middleware for common agent use cases
- [Custom middleware](https://docs.langchain.com/oss/javascript/langchain/middleware/custom.md)
- [Overview](https://docs.langchain.com/oss/javascript/langchain/middleware/overview.md): Control and customize agent execution at every step
- [Models](https://docs.langchain.com/oss/javascript/langchain/models.md)
- [Custom workflow](https://docs.langchain.com/oss/javascript/langchain/multi-agent/custom-workflow.md)
- [Handoffs](https://docs.langchain.com/oss/javascript/langchain/multi-agent/handoffs.md)
- [Build customer support with handoffs](https://docs.langchain.com/oss/javascript/langchain/multi-agent/handoffs-customer-support.md)
- [Multi-agent](https://docs.langchain.com/oss/javascript/langchain/multi-agent/index.md)
- [Router](https://docs.langchain.com/oss/javascript/langchain/multi-agent/router.md)
- [Build a multi-source knowledge base with routing](https://docs.langchain.com/oss/javascript/langchain/multi-agent/router-knowledge-base.md)
- [Skills](https://docs.langchain.com/oss/javascript/langchain/multi-agent/skills.md)
- [Build a SQL assistant with on-demand skills](https://docs.langchain.com/oss/javascript/langchain/multi-agent/skills-sql-assistant.md)
- [Subagents](https://docs.langchain.com/oss/javascript/langchain/multi-agent/subagents.md)
- [Build a personal assistant with subagents](https://docs.langchain.com/oss/javascript/langchain/multi-agent/subagents-personal-assistant.md)
- [LangSmith Observability](https://docs.langchain.com/oss/javascript/langchain/observability.md)
- [LangChain overview](https://docs.langchain.com/oss/javascript/langchain/overview.md): LangChain is an open source framework with a pre-built agent architecture and integrations for any model or tool — so you can build agents that adapt as fast as the ecosystem evolves
- [Philosophy](https://docs.langchain.com/oss/javascript/langchain/philosophy.md): LangChain exists to be the easiest place to start building with LLMs, while also being flexible and production-ready.
- [Quickstart](https://docs.langchain.com/oss/javascript/langchain/quickstart.md)
- [Build a RAG agent with LangChain](https://docs.langchain.com/oss/javascript/langchain/rag.md)
- [Retrieval](https://docs.langchain.com/oss/javascript/langchain/retrieval.md)
- [Runtime](https://docs.langchain.com/oss/javascript/langchain/runtime.md)
- [Short-term memory](https://docs.langchain.com/oss/javascript/langchain/short-term-memory.md)
- [Build a SQL agent](https://docs.langchain.com/oss/javascript/langchain/sql-agent.md)
- [Frontend](https://docs.langchain.com/oss/javascript/langchain/streaming/frontend.md): Build generative UIs with real-time streaming from LangChain agents, LangGraph graphs, and custom APIs
- [Overview](https://docs.langchain.com/oss/javascript/langchain/streaming/overview.md): Stream real-time updates from agent runs
- [Structured output](https://docs.langchain.com/oss/javascript/langchain/structured-output.md)
- [LangSmith Studio](https://docs.langchain.com/oss/javascript/langchain/studio.md)
- [Test](https://docs.langchain.com/oss/javascript/langchain/test.md)
- [Tools](https://docs.langchain.com/oss/javascript/langchain/tools.md)
- [Agent Chat UI](https://docs.langchain.com/oss/javascript/langchain/ui.md)
- [Build a voice agent with LangChain](https://docs.langchain.com/oss/javascript/langchain/voice-agent.md)
- [Memory](https://docs.langchain.com/oss/javascript/langgraph/add-memory.md)
- [Build a custom RAG agent with LangGraph](https://docs.langchain.com/oss/javascript/langgraph/agentic-rag.md)
- [Application structure](https://docs.langchain.com/oss/javascript/langgraph/application-structure.md)
- [Case studies](https://docs.langchain.com/oss/javascript/langgraph/case-studies.md)
- [Changelog](https://docs.langchain.com/oss/javascript/langgraph/changelog-js.md)
- [Choosing between Graph and Functional APIs](https://docs.langchain.com/oss/javascript/langgraph/choosing-apis.md)
- [LangSmith Deployment](https://docs.langchain.com/oss/javascript/langgraph/deploy.md)
- [Durable execution](https://docs.langchain.com/oss/javascript/langgraph/durable-execution.md)
- [Functional API overview](https://docs.langchain.com/oss/javascript/langgraph/functional-api.md)
- [Graph API overview](https://docs.langchain.com/oss/javascript/langgraph/graph-api.md)
- [Install LangGraph](https://docs.langchain.com/oss/javascript/langgraph/install.md)
- [Interrupts](https://docs.langchain.com/oss/javascript/langgraph/interrupts.md)
- [Run a local server](https://docs.langchain.com/oss/javascript/langgraph/local-server.md)
- [LangSmith Observability](https://docs.langchain.com/oss/javascript/langgraph/observability.md)
- [LangGraph overview](https://docs.langchain.com/oss/javascript/langgraph/overview.md): Gain control with LangGraph to design agents that reliably handle complex tasks
- [Persistence](https://docs.langchain.com/oss/javascript/langgraph/persistence.md)
- [LangGraph runtime](https://docs.langchain.com/oss/javascript/langgraph/pregel.md)
- [Quickstart](https://docs.langchain.com/oss/javascript/langgraph/quickstart.md)
- [Streaming](https://docs.langchain.com/oss/javascript/langgraph/streaming.md)
- [LangSmith Studio](https://docs.langchain.com/oss/javascript/langgraph/studio.md)
- [Test](https://docs.langchain.com/oss/javascript/langgraph/test.md)
- [Thinking in LangGraph](https://docs.langchain.com/oss/javascript/langgraph/thinking-in-langgraph.md): Learn how to think about building agents with LangGraph
- [Agent Chat UI](https://docs.langchain.com/oss/javascript/langgraph/ui.md)
- [Use the functional API](https://docs.langchain.com/oss/javascript/langgraph/use-functional-api.md)
- [Use the graph API](https://docs.langchain.com/oss/javascript/langgraph/use-graph-api.md)
- [Subgraphs](https://docs.langchain.com/oss/javascript/langgraph/use-subgraphs.md)
- [Use time-travel](https://docs.langchain.com/oss/javascript/langgraph/use-time-travel.md)
- [Workflows and agents](https://docs.langchain.com/oss/javascript/langgraph/workflows-agents.md)
- [Learn](https://docs.langchain.com/oss/javascript/learn.md): Tutorials, conceptual guides, and resources to help you get started.
- [LangChain v1 migration guide](https://docs.langchain.com/oss/javascript/migrate/langchain-v1.md)
- [LangGraph v1 migration guide](https://docs.langchain.com/oss/javascript/migrate/langgraph-v1.md)
- [Deep Agents](https://docs.langchain.com/oss/javascript/reference/deepagents-javascript.md)
- [LangChain SDK](https://docs.langchain.com/oss/javascript/reference/langchain-javascript.md)
- [LangGraph SDK](https://docs.langchain.com/oss/javascript/reference/langgraph-javascript.md)
- [Reference](https://docs.langchain.com/oss/javascript/reference/overview.md)
- [Release policy](https://docs.langchain.com/oss/javascript/release-policy.md)
- [Changelog](https://docs.langchain.com/oss/javascript/releases/changelog.md): Log of updates and improvements to our JavaScript/TypeScript packages
- [What's new in LangChain v1](https://docs.langchain.com/oss/javascript/releases/langchain-v1.md)
- [What's new in LangGraph v1](https://docs.langchain.com/oss/javascript/releases/langgraph-v1.md)
- [Security policy](https://docs.langchain.com/oss/javascript/security-policy.md)
- [Versioning](https://docs.langchain.com/oss/javascript/versioning.md)
- [Errors](https://docs.langchain.com/oss/python/common-errors.md)
- [Context overview](https://docs.langchain.com/oss/python/concepts/context.md)
- [Memory overview](https://docs.langchain.com/oss/python/concepts/memory.md)
- [Frameworks, runtimes, and harnesses](https://docs.langchain.com/oss/python/concepts/products.md): Understand the differences between LangChain, LangGraph, and DeepAgents and when to use each one
- [Contributing to code](https://docs.langchain.com/oss/python/contributing/code.md)
- [Co-marketing](https://docs.langchain.com/oss/python/contributing/comarketing.md)
- [Contributing to documentation](https://docs.langchain.com/oss/python/contributing/documentation.md)
- [Implement a LangChain integration](https://docs.langchain.com/oss/python/contributing/implement-langchain.md)
- [Contributing integrations](https://docs.langchain.com/oss/python/contributing/integrations-langchain.md)
- [Contributing](https://docs.langchain.com/oss/python/contributing/overview.md)
- [Publish an integration](https://docs.langchain.com/oss/python/contributing/publish-langchain.md)
- [Using standard tests](https://docs.langchain.com/oss/python/contributing/standard-tests-langchain.md)
- [Backends](https://docs.langchain.com/oss/python/deepagents/backends.md): Choose and configure filesystem backends for deep agents. You can specify routes to different backends, implement virtual filesystems, and enforce policies.
- [Deep Agents CLI](https://docs.langchain.com/oss/python/deepagents/cli.md): Interactive command-line interface for building with Deep Agents
- [Customize Deep Agents](https://docs.langchain.com/oss/python/deepagents/customization.md): Learn how to customize deep agents with system prompts, tools, subagents, and more
- [Agent harness capabilities](https://docs.langchain.com/oss/python/deepagents/harness.md)
- [Human-in-the-loop](https://docs.langchain.com/oss/python/deepagents/human-in-the-loop.md): Learn how to configure human approval for sensitive tool operations
- [Long-term memory](https://docs.langchain.com/oss/python/deepagents/long-term-memory.md): Learn how to extend deep agents with persistent memory across threads
- [Deep Agents Middleware](https://docs.langchain.com/oss/python/deepagents/middleware.md): Understand the middleware that powers deep agents
- [Deep Agents overview](https://docs.langchain.com/oss/python/deepagents/overview.md): Build agents that can plan, use subagents, and leverage file systems for complex tasks
- [Quickstart](https://docs.langchain.com/oss/python/deepagents/quickstart.md): Build your first deep agent in minutes
- [Skills](https://docs.langchain.com/oss/python/deepagents/skills.md): Learn how to extend your deep agent's capabilities with skills
- [Subagents](https://docs.langchain.com/oss/python/deepagents/subagents.md): Learn how to use subagents to delegate work and keep context clean
- [ChatGroq](https://docs.langchain.com/oss/python/integrations/chat/groq.md): Get started using Groq [chat models](/oss/python/langchain/models) in LangChain.
- [Chat models](https://docs.langchain.com/oss/python/integrations/chat/index.md)
- [null](https://docs.langchain.com/oss/python/integrations/document_loaders/index.md)
- [Provider-specific middleware](https://docs.langchain.com/oss/python/integrations/middleware/index.md)
- [All integration providers](https://docs.langchain.com/oss/python/integrations/providers/all_providers.md)
- [Anthropic (Claude)](https://docs.langchain.com/oss/python/integrations/providers/anthropic.md)
- [AWS (Amazon)](https://docs.langchain.com/oss/python/integrations/providers/aws.md)
- [Google](https://docs.langchain.com/oss/python/integrations/providers/google.md)
- [Hugging Face](https://docs.langchain.com/oss/python/integrations/providers/huggingface.md)
- [Microsoft](https://docs.langchain.com/oss/python/integrations/providers/microsoft.md)
- [Ollama](https://docs.langchain.com/oss/python/integrations/providers/ollama.md)
- [OpenAI](https://docs.langchain.com/oss/python/integrations/providers/openai.md)
- [LangChain integrations packages](https://docs.langchain.com/oss/python/integrations/providers/overview.md)
- [Retrievers](https://docs.langchain.com/oss/python/integrations/retrievers/index.md)
- [Text splitters](https://docs.langchain.com/oss/python/integrations/splitters/index.md)
- [Key-value stores](https://docs.langchain.com/oss/python/integrations/stores/index.md)
- [Embedding models](https://docs.langchain.com/oss/python/integrations/text_embedding/index.md)
- [Tools and toolkits](https://docs.langchain.com/oss/python/integrations/tools/index.md)
- [Vector stores](https://docs.langchain.com/oss/python/integrations/vectorstores/index.md)
- [LangChain Academy](https://docs.langchain.com/oss/python/langchain/academy.md)
- [Agents](https://docs.langchain.com/oss/python/langchain/agents.md)
- [Changelog](https://docs.langchain.com/oss/python/langchain/changelog-py.md)
- [Component architecture](https://docs.langchain.com/oss/python/langchain/component-architecture.md)
- [Context engineering in agents](https://docs.langchain.com/oss/python/langchain/context-engineering.md)
- [LangSmith Deployment](https://docs.langchain.com/oss/python/langchain/deploy.md)
- [Get help](https://docs.langchain.com/oss/python/langchain/get-help.md)
- [Guardrails](https://docs.langchain.com/oss/python/langchain/guardrails.md): Implement safety checks and content filtering for your agents
- [Human-in-the-loop](https://docs.langchain.com/oss/python/langchain/human-in-the-loop.md)
- [Install LangChain](https://docs.langchain.com/oss/python/langchain/install.md)
- [Build a semantic search engine with LangChain](https://docs.langchain.com/oss/python/langchain/knowledge-base.md)
- [Long-term memory](https://docs.langchain.com/oss/python/langchain/long-term-memory.md)
- [Model Context Protocol (MCP)](https://docs.langchain.com/oss/python/langchain/mcp.md)
- [Messages](https://docs.langchain.com/oss/python/langchain/messages.md)
- [Built-in middleware](https://docs.langchain.com/oss/python/langchain/middleware/built-in.md): Prebuilt middleware for common agent use cases
- [Custom middleware](https://docs.langchain.com/oss/python/langchain/middleware/custom.md)
- [Overview](https://docs.langchain.com/oss/python/langchain/middleware/overview.md): Control and customize agent execution at every step
- [Models](https://docs.langchain.com/oss/python/langchain/models.md)
- [Custom workflow](https://docs.langchain.com/oss/python/langchain/multi-agent/custom-workflow.md)
- [Handoffs](https://docs.langchain.com/oss/python/langchain/multi-agent/handoffs.md)
- [Build customer support with handoffs](https://docs.langchain.com/oss/python/langchain/multi-agent/handoffs-customer-support.md)
- [Multi-agent](https://docs.langchain.com/oss/python/langchain/multi-agent/index.md)
- [Router](https://docs.langchain.com/oss/python/langchain/multi-agent/router.md)
- [Build a multi-source knowledge base with routing](https://docs.langchain.com/oss/python/langchain/multi-agent/router-knowledge-base.md)
- [Skills](https://docs.langchain.com/oss/python/langchain/multi-agent/skills.md)
- [Build a SQL assistant with on-demand skills](https://docs.langchain.com/oss/python/langchain/multi-agent/skills-sql-assistant.md)
- [Subagents](https://docs.langchain.com/oss/python/langchain/multi-agent/subagents.md)
- [Build a personal assistant with subagents](https://docs.langchain.com/oss/python/langchain/multi-agent/subagents-personal-assistant.md)
- [LangSmith Observability](https://docs.langchain.com/oss/python/langchain/observability.md)
- [LangChain overview](https://docs.langchain.com/oss/python/langchain/overview.md): LangChain is an open source framework with a pre-built agent architecture and integrations for any model or tool — so you can build agents that adapt as fast as the ecosystem evolves
- [Philosophy](https://docs.langchain.com/oss/python/langchain/philosophy.md): LangChain exists to be the easiest place to start building with LLMs, while also being flexible and production-ready.
- [Quickstart](https://docs.langchain.com/oss/python/langchain/quickstart.md)
- [Build a RAG agent with LangChain](https://docs.langchain.com/oss/python/langchain/rag.md)
- [Retrieval](https://docs.langchain.com/oss/python/langchain/retrieval.md)
- [Runtime](https://docs.langchain.com/oss/python/langchain/runtime.md)
- [Short-term memory](https://docs.langchain.com/oss/python/langchain/short-term-memory.md)
- [Build a SQL agent](https://docs.langchain.com/oss/python/langchain/sql-agent.md)
- [Frontend](https://docs.langchain.com/oss/python/langchain/streaming/frontend.md): Build generative UIs with real-time streaming from LangChain agents, LangGraph graphs, and custom APIs
- [Overview](https://docs.langchain.com/oss/python/langchain/streaming/overview.md): Stream real-time updates from agent runs
- [Structured output](https://docs.langchain.com/oss/python/langchain/structured-output.md)
- [LangSmith Studio](https://docs.langchain.com/oss/python/langchain/studio.md)
- [Test](https://docs.langchain.com/oss/python/langchain/test.md)
- [Tools](https://docs.langchain.com/oss/python/langchain/tools.md)
- [Agent Chat UI](https://docs.langchain.com/oss/python/langchain/ui.md)
- [Build a voice agent with LangChain](https://docs.langchain.com/oss/python/langchain/voice-agent.md)
- [Memory](https://docs.langchain.com/oss/python/langgraph/add-memory.md)
- [Build a custom RAG agent with LangGraph](https://docs.langchain.com/oss/python/langgraph/agentic-rag.md)
- [Application structure](https://docs.langchain.com/oss/python/langgraph/application-structure.md)
- [Case studies](https://docs.langchain.com/oss/python/langgraph/case-studies.md)
- [Changelog](https://docs.langchain.com/oss/python/langgraph/changelog-py.md)
- [Choosing between Graph and Functional APIs](https://docs.langchain.com/oss/python/langgraph/choosing-apis.md)
- [LangSmith Deployment](https://docs.langchain.com/oss/python/langgraph/deploy.md)
- [Durable execution](https://docs.langchain.com/oss/python/langgraph/durable-execution.md)
- [Functional API overview](https://docs.langchain.com/oss/python/langgraph/functional-api.md)
- [Graph API overview](https://docs.langchain.com/oss/python/langgraph/graph-api.md)
- [Install LangGraph](https://docs.langchain.com/oss/python/langgraph/install.md)
- [Interrupts](https://docs.langchain.com/oss/python/langgraph/interrupts.md)
- [Run a local server](https://docs.langchain.com/oss/python/langgraph/local-server.md)
- [LangSmith Observability](https://docs.langchain.com/oss/python/langgraph/observability.md)
- [LangGraph overview](https://docs.langchain.com/oss/python/langgraph/overview.md): Gain control with LangGraph to design agents that reliably handle complex tasks
- [Persistence](https://docs.langchain.com/oss/python/langgraph/persistence.md)
- [LangGraph runtime](https://docs.langchain.com/oss/python/langgraph/pregel.md)
- [Quickstart](https://docs.langchain.com/oss/python/langgraph/quickstart.md)
- [Build a custom SQL agent](https://docs.langchain.com/oss/python/langgraph/sql-agent.md)
- [Streaming](https://docs.langchain.com/oss/python/langgraph/streaming.md)
- [LangSmith Studio](https://docs.langchain.com/oss/python/langgraph/studio.md)
- [Test](https://docs.langchain.com/oss/python/langgraph/test.md)
- [Thinking in LangGraph](https://docs.langchain.com/oss/python/langgraph/thinking-in-langgraph.md): Learn how to think about building agents with LangGraph
- [Agent Chat UI](https://docs.langchain.com/oss/python/langgraph/ui.md)
- [Use the functional API](https://docs.langchain.com/oss/python/langgraph/use-functional-api.md)
- [Use the graph API](https://docs.langchain.com/oss/python/langgraph/use-graph-api.md)
- [Subgraphs](https://docs.langchain.com/oss/python/langgraph/use-subgraphs.md)
- [Use time-travel](https://docs.langchain.com/oss/python/langgraph/use-time-travel.md)
- [Workflows and agents](https://docs.langchain.com/oss/python/langgraph/workflows-agents.md)
- [Learn](https://docs.langchain.com/oss/python/learn.md): Tutorials, conceptual guides, and resources to help you get started.
- [LangChain v1 migration guide](https://docs.langchain.com/oss/python/migrate/langchain-v1.md)
- [LangGraph v1 migration guide](https://docs.langchain.com/oss/python/migrate/langgraph-v1.md)
- [Deep Agents](https://docs.langchain.com/oss/python/reference/deepagents-python.md)
- [Integrations](https://docs.langchain.com/oss/python/reference/integrations-python.md)
- [LangChain SDK](https://docs.langchain.com/oss/python/reference/langchain-python.md)
- [LangGraph SDK](https://docs.langchain.com/oss/python/reference/langgraph-python.md)
- [Reference](https://docs.langchain.com/oss/python/reference/overview.md)
- [Release policy](https://docs.langchain.com/oss/python/release-policy.md)
- [Changelog](https://docs.langchain.com/oss/python/releases/changelog.md): Log of updates and improvements to our Python packages
- [What's new in LangChain v1](https://docs.langchain.com/oss/python/releases/langchain-v1.md)
- [What's new in LangGraph v1](https://docs.langchain.com/oss/python/releases/langgraph-v1.md)
- [Security policy](https://docs.langchain.com/oss/python/security-policy.md)
- [Versioning](https://docs.langchain.com/oss/python/versioning.md)

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### Key Frameworks and Standards
AI audit methodologies often draw from established governance and risk management practices. Relevant frameworks include: 
NIST AI Risk Management Framework: A voluntary framework that guides organizations in managing AI risks across the lifecycle.
The Institute of Internal Auditors (IIA) AI Auditing Framework: Provides guidance for internal auditors on assessing AI risks and controls.
ISO/IEC 42001 & 42006: International standards for AI management systems and the auditing of those systems.
EU AI Act: A regulation that mandates stringent conformity assessments and documentation for high-risk AI systems in the European Union. 

### The AI Audit Process
While there is no single one-size-fits-all approach, a typical AI audit follows a general sequence of steps: 
Planning and Scoping: Define the specific objectives of the audit, the AI systems to be evaluated, and the relevant risks and regulations (e.g., GDPR, EU AI Act) that need to be addressed.
Data Collection and Preparation: Gather all necessary documentation, including design specifications, data sources, and performance metrics.
Assessment: Conduct thorough reviews of the data, algorithms, and outcomes, focusing on key verticals such as efficacy, robustness, bias, explainability, and privacy. This may involve statistical testing and red teaming exercises.
Risk Assessment: Identify and evaluate potential risks (e.g., algorithmic bias, data breaches) and develop a plan to address them.
Reporting and Documentation: Document the findings, supporting evidence, and recommendations in a detailed report for stakeholders and, if necessary, regulators.
Mitigation and Continuous Monitoring: Implement the suggested actions to lower identified risks and establish ongoing monitoring to ensure continuous compliance and performance improvement

### Key Components of an AI Audit
A comprehensive AI audit generally examines three core areas: 
Data Auditing: This involves reviewing the data used to train and operate the AI system. Auditors check for data quality, accuracy, completeness, and potential biases to ensure the data is reliable and representative of diverse populations.
Algorithm Auditing: This step focuses on the AI model itself, examining its logic, code, and parameters to ensure it functions as designed and is free from errors or unintended biases. Explainability and interpretability methods are used to understand how the system makes decisions.
Outcome Auditing: This involves evaluating the results produced by the AI system to confirm they are accurate, fair, and consistent with expected outcomes. This includes comparing AI-generated results against baseline standards and checking for deviations across different demographic groups.

https://reference.langchain.com/javascript/modules/langchain.html?_gl=1*1dbw4po*_gcl_au*OTAwNjU1NjQ5LjE3NjY4ODIxMDA.*_ga*Mjc4NzEwNzA3LjE3NjY4ODIxMDE.*_ga_47WX3HKKY2*czE3NjkzNjE3OTAkbzkkZzEkdDE3NjkzNjIxMDckajYwJGwwJGgw

https://reference.langchain.com/javascript/modules/_langchain_langgraph.html?_gl=1*1dbw4po*_gcl_au*OTAwNjU1NjQ5LjE3NjY4ODIxMDA.*_ga*Mjc4NzEwNzA3LjE3NjY4ODIxMDE.*_ga_47WX3HKKY2*czE3NjkzNjE3OTAkbzkkZzEkdDE3NjkzNjIxMDckajYwJGwwJGgw

https://reference.langchain.com/javascript/modules/deepagents.html?_gl=1*1dbw4po*_gcl_au*OTAwNjU1NjQ5LjE3NjY4ODIxMDA.*_ga*Mjc4NzEwNzA3LjE3NjY4ODIxMDE.*_ga_47WX3HKKY2*czE3NjkzNjE3OTAkbzkkZzEkdDE3NjkzNjIxMDckajYwJGwwJGgw

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.langchain.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Persistence

LangGraph has a built-in persistence layer, implemented through checkpointers. When you compile a graph with a checkpointer, the checkpointer saves a `checkpoint` of the graph state at every super-step. Those checkpoints are saved to a `thread`, which can be accessed after graph execution. Because `threads` allow access to graph's state after execution, several powerful capabilities including human-in-the-loop, memory, time travel, and fault-tolerance are all possible. Below, we'll discuss each of these concepts in more detail.

<img src="https://mintcdn.com/langchain-5e9cc07a/-_xGPoyjhyiDWTPJ/oss/images/checkpoints.jpg?fit=max&auto=format&n=-_xGPoyjhyiDWTPJ&q=85&s=966566aaae853ed4d240c2d0d067467c" alt="Checkpoints" data-og-width="2316" width="2316" data-og-height="748" height="748" data-path="oss/images/checkpoints.jpg" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/langchain-5e9cc07a/-_xGPoyjhyiDWTPJ/oss/images/checkpoints.jpg?w=280&fit=max&auto=format&n=-_xGPoyjhyiDWTPJ&q=85&s=7bb8525bfcd22b3903b3209aa7497f47 280w, https://mintcdn.com/langchain-5e9cc07a/-_xGPoyjhyiDWTPJ/oss/images/checkpoints.jpg?w=560&fit=max&auto=format&n=-_xGPoyjhyiDWTPJ&q=85&s=e8d07fc2899b9a13c7b00eb9b259c3c9 560w, https://mintcdn.com/langchain-5e9cc07a/-_xGPoyjhyiDWTPJ/oss/images/checkpoints.jpg?w=840&fit=max&auto=format&n=-_xGPoyjhyiDWTPJ&q=85&s=46a2f9ed3b131a7c78700711e8c314d6 840w, https://mintcdn.com/langchain-5e9cc07a/-_xGPoyjhyiDWTPJ/oss/images/checkpoints.jpg?w=1100&fit=max&auto=format&n=-_xGPoyjhyiDWTPJ&q=85&s=c339bd49757810dad226e1846f066c94 1100w, https://mintcdn.com/langchain-5e9cc07a/-_xGPoyjhyiDWTPJ/oss/images/checkpoints.jpg?w=1650&fit=max&auto=format&n=-_xGPoyjhyiDWTPJ&q=85&s=8333dfdb9d766363f251132f2dfa08a1 1650w, https://mintcdn.com/langchain-5e9cc07a/-_xGPoyjhyiDWTPJ/oss/images/checkpoints.jpg?w=2500&fit=max&auto=format&n=-_xGPoyjhyiDWTPJ&q=85&s=33ba13937eed043ba4a7a87b36d3046f 2500w" />

<Info>
  **Agent Server handles checkpointing automatically**
  When using the [Agent Server](/langsmith/agent-server), you don't need to implement or configure checkpointers manually. The server handles all persistence infrastructure for you behind the scenes.
</Info>

## Threads

A thread is a unique ID or thread identifier assigned to each checkpoint saved by a checkpointer. It contains the accumulated state of a sequence of [runs](/langsmith/assistants#execution). When a run is executed, the [state](/oss/javascript/langgraph/graph-api#state) of the underlying graph of the assistant will be persisted to the thread.

When invoking a graph with a checkpointer, you **must** specify a `thread_id` as part of the `configurable` portion of the config:

```typescript  theme={null}
{
  configurable: {
    thread_id: "1";
  }
}
```

A thread's current and historical state can be retrieved. To persist state, a thread must be created prior to executing a run. The LangSmith API provides several endpoints for creating and managing threads and thread state. See the [API reference](https://reference.langchain.com/python/langsmith/) for more details.

The checkpointer uses `thread_id` as the primary key for storing and retrieving checkpoints. Without it, the checkpointer cannot save state or resume execution after an [interrupt](/oss/javascript/langgraph/interrupts), since the checkpointer uses `thread_id` to load the saved state.

## Checkpoints

The state of a thread at a particular point in time is called a checkpoint. Checkpoint is a snapshot of the graph state saved at each super-step and is represented by `StateSnapshot` object with the following key properties:

* `config`: Config associated with this checkpoint.
* `metadata`: Metadata associated with this checkpoint.
* `values`: Values of the state channels at this point in time.
* `next` A tuple of the node names to execute next in the graph.
* `tasks`: A tuple of `PregelTask` objects that contain information about next tasks to be executed. If the step was previously attempted, it will include error information. If a graph was interrupted [dynamically](/oss/javascript/langgraph/interrupts#pause-using-interrupt) from within a node, tasks will contain additional data associated with interrupts.

Checkpoints are persisted and can be used to restore the state of a thread at a later time.

Let's see what checkpoints are saved when a simple graph is invoked as follows:

```typescript  theme={null}
import { StateGraph, StateSchema, ReducedValue, START, END, MemorySaver } from "@langchain/langgraph";
import { z } from "zod/v4";

const State = new StateSchema({
  foo: z.string(),
  bar: new ReducedValue(
    z.array(z.string()).default(() => []),
    {
      inputSchema: z.array(z.string()),
      reducer: (x, y) => x.concat(y),
    }
  ),
});

const workflow = new StateGraph(State)
  .addNode("nodeA", (state) => {
    return { foo: "a", bar: ["a"] };
  })
  .addNode("nodeB", (state) => {
    return { foo: "b", bar: ["b"] };
  })
  .addEdge(START, "nodeA")
  .addEdge("nodeA", "nodeB")
  .addEdge("nodeB", END);

const checkpointer = new MemorySaver();
const graph = workflow.compile({ checkpointer });

const config = { configurable: { thread_id: "1" } };
await graph.invoke({ foo: "", bar: [] }, config);
```

After we run the graph, we expect to see exactly 4 checkpoints:

* Empty checkpoint with [`START`](https://reference.langchain.com/javascript/variables/_langchain_langgraph.index.START.html) as the next node to be executed
* Checkpoint with the user input `{'foo': '', 'bar': []}` and `nodeA` as the next node to be executed
* Checkpoint with the outputs of `nodeA` `{'foo': 'a', 'bar': ['a']}` and `nodeB` as the next node to be executed
* Checkpoint with the outputs of `nodeB` `{'foo': 'b', 'bar': ['a', 'b']}` and no next nodes to be executed

Note that the `bar` channel values contain outputs from both nodes as we have a reducer for the `bar` channel.

### Get state

When interacting with the saved graph state, you **must** specify a [thread identifier](#threads). You can view the *latest* state of the graph by calling `graph.getState(config)`. This will return a `StateSnapshot` object that corresponds to the latest checkpoint associated with the thread ID provided in the config or a checkpoint associated with a checkpoint ID for the thread, if provided.

```typescript  theme={null}
// get the latest state snapshot
const config = { configurable: { thread_id: "1" } };
await graph.getState(config);

// get a state snapshot for a specific checkpoint_id
const config = {
  configurable: {
    thread_id: "1",
    checkpoint_id: "1ef663ba-28fe-6528-8002-5a559208592c",
  },
};
await graph.getState(config);
```

In our example, the output of `getState` will look like this:

```
StateSnapshot {
  values: { foo: 'b', bar: ['a', 'b'] },
  next: [],
  config: {
    configurable: {
      thread_id: '1',
      checkpoint_ns: '',
      checkpoint_id: '1ef663ba-28fe-6528-8002-5a559208592c'
    }
  },
  metadata: {
    source: 'loop',
    writes: { nodeB: { foo: 'b', bar: ['b'] } },
    step: 2
  },
  createdAt: '2024-08-29T19:19:38.821749+00:00',
  parentConfig: {
    configurable: {
      thread_id: '1',
      checkpoint_ns: '',
      checkpoint_id: '1ef663ba-28f9-6ec4-8001-31981c2c39f8'
    }
  },
  tasks: []
}
```

### Get state history

You can get the full history of the graph execution for a given thread by calling `graph.getStateHistory(config)`. This will return a list of `StateSnapshot` objects associated with the thread ID provided in the config. Importantly, the checkpoints will be ordered chronologically with the most recent checkpoint / `StateSnapshot` being the first in the list.

```typescript  theme={null}
const config = { configurable: { thread_id: "1" } };
for await (const state of graph.getStateHistory(config)) {
  console.log(state);
}
```

In our example, the output of `getStateHistory` will look like this:

```
[
  StateSnapshot {
    values: { foo: 'b', bar: ['a', 'b'] },
    next: [],
    config: {
      configurable: {
        thread_id: '1',
        checkpoint_ns: '',
        checkpoint_id: '1ef663ba-28fe-6528-8002-5a559208592c'
      }
    },
    metadata: {
      source: 'loop',
      writes: { nodeB: { foo: 'b', bar: ['b'] } },
      step: 2
    },
    createdAt: '2024-08-29T19:19:38.821749+00:00',
    parentConfig: {
      configurable: {
        thread_id: '1',
        checkpoint_ns: '',
        checkpoint_id: '1ef663ba-28f9-6ec4-8001-31981c2c39f8'
      }
    },
    tasks: []
  },
  StateSnapshot {
    values: { foo: 'a', bar: ['a'] },
    next: ['nodeB'],
    config: {
      configurable: {
        thread_id: '1',
        checkpoint_ns: '',
        checkpoint_id: '1ef663ba-28f9-6ec4-8001-31981c2c39f8'
      }
    },
    metadata: {
      source: 'loop',
      writes: { nodeA: { foo: 'a', bar: ['a'] } },
      step: 1
    },
    createdAt: '2024-08-29T19:19:38.819946+00:00',
    parentConfig: {
      configurable: {
        thread_id: '1',
        checkpoint_ns: '',
        checkpoint_id: '1ef663ba-28f4-6b4a-8000-ca575a13d36a'
      }
    },
    tasks: [
      PregelTask {
        id: '6fb7314f-f114-5413-a1f3-d37dfe98ff44',
        name: 'nodeB',
        error: null,
        interrupts: []
      }
    ]
  },
  StateSnapshot {
    values: { foo: '', bar: [] },
    next: ['node_a'],
    config: {
      configurable: {
        thread_id: '1',
        checkpoint_ns: '',
        checkpoint_id: '1ef663ba-28f4-6b4a-8000-ca575a13d36a'
      }
    },
    metadata: {
      source: 'loop',
      writes: null,
      step: 0
    },
    createdAt: '2024-08-29T19:19:38.817813+00:00',
    parentConfig: {
      configurable: {
        thread_id: '1',
        checkpoint_ns: '',
        checkpoint_id: '1ef663ba-28f0-6c66-bfff-6723431e8481'
      }
    },
    tasks: [
      PregelTask {
        id: 'f1b14528-5ee5-579c-949b-23ef9bfbed58',
        name: 'node_a',
        error: null,
        interrupts: []
      }
    ]
  },
  StateSnapshot {
    values: { bar: [] },
    next: ['__start__'],
    config: {
      configurable: {
        thread_id: '1',
        checkpoint_ns: '',
        checkpoint_id: '1ef663ba-28f0-6c66-bfff-6723431e8481'
      }
    },
    metadata: {
      source: 'input',
      writes: { foo: '' },
      step: -1
    },
    createdAt: '2024-08-29T19:19:38.816205+00:00',
    parentConfig: null,
    tasks: [
      PregelTask {
        id: '6d27aa2e-d72b-5504-a36f-8620e54a76dd',
        name: '__start__',
        error: null,
        interrupts: []
      }
    ]
  }
]
```

<img src="https://mintcdn.com/langchain-5e9cc07a/-_xGPoyjhyiDWTPJ/oss/images/get_state.jpg?fit=max&auto=format&n=-_xGPoyjhyiDWTPJ&q=85&s=38ffff52be4d8806b287836295a3c058" alt="State" data-og-width="2692" width="2692" data-og-height="1056" height="1056" data-path="oss/images/get_state.jpg" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/langchain-5e9cc07a/-_xGPoyjhyiDWTPJ/oss/images/get_state.jpg?w=280&fit=max&auto=format&n=-_xGPoyjhyiDWTPJ&q=85&s=e932acac5021614d0eb99b90e54be004 280w, https://mintcdn.com/langchain-5e9cc07a/-_xGPoyjhyiDWTPJ/oss/images/get_state.jpg?w=560&fit=max&auto=format&n=-_xGPoyjhyiDWTPJ&q=85&s=2eaf153fd49ba728e1d679c12bb44b6f 560w, https://mintcdn.com/langchain-5e9cc07a/-_xGPoyjhyiDWTPJ/oss/images/get_state.jpg?w=840&fit=max&auto=format&n=-_xGPoyjhyiDWTPJ&q=85&s=0ac091c7dbe8b1f0acff97615a3683ee 840w, https://mintcdn.com/langchain-5e9cc07a/-_xGPoyjhyiDWTPJ/oss/images/get_state.jpg?w=1100&fit=max&auto=format&n=-_xGPoyjhyiDWTPJ&q=85&s=9921a482f1c4f86316fca23a5150b153 1100w, https://mintcdn.com/langchain-5e9cc07a/-_xGPoyjhyiDWTPJ/oss/images/get_state.jpg?w=1650&fit=max&auto=format&n=-_xGPoyjhyiDWTPJ&q=85&s=9412cd906f6d67a9fe1f50a5d4f4c674 1650w, https://mintcdn.com/langchain-5e9cc07a/-_xGPoyjhyiDWTPJ/oss/images/get_state.jpg?w=2500&fit=max&auto=format&n=-_xGPoyjhyiDWTPJ&q=85&s=ccc5118ed85926bda3715c81ce728fcc 2500w" />

### Replay

It's also possible to play-back a prior graph execution. If we `invoke` a graph with a `thread_id` and a `checkpoint_id`, then we will *re-play* the previously executed steps *before* a checkpoint that corresponds to the `checkpoint_id`, and only execute the steps *after* the checkpoint.

* `thread_id` is the ID of a thread.
* `checkpoint_id` is an identifier that refers to a specific checkpoint within a thread.

You must pass these when invoking the graph as part of the `configurable` portion of the config:

```typescript  theme={null}
const config = {
  configurable: {
    thread_id: "1",
    checkpoint_id: "0c62ca34-ac19-445d-bbb0-5b4984975b2a",
  },
};
await graph.invoke(null, config);
```

Importantly, LangGraph knows whether a particular step has been executed previously. If it has, LangGraph simply *re-plays* that particular step in the graph and does not re-execute the step, but only for the steps *before* the provided `checkpoint_id`. All of the steps *after* `checkpoint_id` will be executed (i.e., a new fork), even if they have been executed previously. See this [how to guide on time-travel to learn more about replaying](/oss/javascript/langgraph/use-time-travel).

<img src="https://mintcdn.com/langchain-5e9cc07a/dL5Sn6Cmy9pwtY0V/oss/images/re_play.png?fit=max&auto=format&n=dL5Sn6Cmy9pwtY0V&q=85&s=d7b34b85c106e55d181ae1f4afb50251" alt="Replay" data-og-width="2276" width="2276" data-og-height="986" height="986" data-path="oss/images/re_play.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/langchain-5e9cc07a/dL5Sn6Cmy9pwtY0V/oss/images/re_play.png?w=280&fit=max&auto=format&n=dL5Sn6Cmy9pwtY0V&q=85&s=627d1fb4cb0ce3e5734784cc4a841cca 280w, https://mintcdn.com/langchain-5e9cc07a/dL5Sn6Cmy9pwtY0V/oss/images/re_play.png?w=560&fit=max&auto=format&n=dL5Sn6Cmy9pwtY0V&q=85&s=ab462e9559619778d1bdfced578ee0ba 560w, https://mintcdn.com/langchain-5e9cc07a/dL5Sn6Cmy9pwtY0V/oss/images/re_play.png?w=840&fit=max&auto=format&n=dL5Sn6Cmy9pwtY0V&q=85&s=7cc304a2a0996e22f783e9a5f7a69f89 840w, https://mintcdn.com/langchain-5e9cc07a/dL5Sn6Cmy9pwtY0V/oss/images/re_play.png?w=1100&fit=max&auto=format&n=dL5Sn6Cmy9pwtY0V&q=85&s=b322f66ef96d6734dcac38213104f080 1100w, https://mintcdn.com/langchain-5e9cc07a/dL5Sn6Cmy9pwtY0V/oss/images/re_play.png?w=1650&fit=max&auto=format&n=dL5Sn6Cmy9pwtY0V&q=85&s=922f1b014b33fae4fda1e576d57a9983 1650w, https://mintcdn.com/langchain-5e9cc07a/dL5Sn6Cmy9pwtY0V/oss/images/re_play.png?w=2500&fit=max&auto=format&n=dL5Sn6Cmy9pwtY0V&q=85&s=efae9196c69a2908846c9d23ad117a90 2500w" />

### Update state

In addition to re-playing the graph from specific `checkpoints`, we can also *edit* the graph state. We do this using `graph.updateState()`. This method accepts three different arguments:

#### `config`

The config should contain `thread_id` specifying which thread to update. When only the `thread_id` is passed, we update (or fork) the current state. Optionally, if we include `checkpoint_id` field, then we fork that selected checkpoint.

#### `values`

These are the values that will be used to update the state. Note that this update is treated exactly as any update from a node is treated. This means that these values will be passed to the [reducer](/oss/javascript/langgraph/graph-api#reducers) functions, if they are defined for some of the channels in the graph state. This means that [`update_state`](https://reference.langchain.com/javascript/classes/_langchain_langgraph.pregel.Pregel.html#updateState) does NOT automatically overwrite the channel values for every channel, but only for the channels without reducers. Let's walk through an example.

Let's assume you have defined the state of your graph with the following schema (see full example above):

```typescript  theme={null}
import { StateSchema, ReducedValue } from "@langchain/langgraph";
import * as z from "zod";

const State = new StateSchema({
  foo: z.number(),
  bar: new ReducedValue(
    z.array(z.string()).default(() => []),
    {
      inputSchema: z.array(z.string()),
      reducer: (x, y) => x.concat(y),
    }
  ),
});
```

Let's now assume the current state of the graph is

```typescript  theme={null}
{ foo: 1, bar: ["a"] }
```

If you update the state as below:

```typescript  theme={null}
await graph.updateState(config, { foo: 2, bar: ["b"] });
```

Then the new state of the graph will be:

```typescript  theme={null}
{ foo: 2, bar: ["a", "b"] }
```

The `foo` key (channel) is completely changed (because there is no reducer specified for that channel, so `updateState` overwrites it). However, there is a reducer specified for the `bar` key, and so it appends `"b"` to the state of `bar`.

#### `as_node`

The final thing you can optionally specify when calling `updateState` is `asNode`. If you provide it, the update will be applied as if it came from node `asNode`. If `asNode` is not provided, it will be set to the last node that updated the state, if not ambiguous. The reason this matters is that the next steps to execute depend on the last node to have given an update, so this can be used to control which node executes next. See this [how to guide on time-travel to learn more about forking state](/oss/javascript/langgraph/use-time-travel).

<img src="https://mintcdn.com/langchain-5e9cc07a/-_xGPoyjhyiDWTPJ/oss/images/checkpoints_full_story.jpg?fit=max&auto=format&n=-_xGPoyjhyiDWTPJ&q=85&s=a52016b2c44b57bd395d6e1eac47aa36" alt="Update" data-og-width="3705" width="3705" data-og-height="2598" height="2598" data-path="oss/images/checkpoints_full_story.jpg" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/langchain-5e9cc07a/-_xGPoyjhyiDWTPJ/oss/images/checkpoints_full_story.jpg?w=280&fit=max&auto=format&n=-_xGPoyjhyiDWTPJ&q=85&s=06de1669d4d62f0e8013c4ffef021437 280w, https://mintcdn.com/langchain-5e9cc07a/-_xGPoyjhyiDWTPJ/oss/images/checkpoints_full_story.jpg?w=560&fit=max&auto=format&n=-_xGPoyjhyiDWTPJ&q=85&s=b149bed4f842c4f179e55247a426befe 560w, https://mintcdn.com/langchain-5e9cc07a/-_xGPoyjhyiDWTPJ/oss/images/checkpoints_full_story.jpg?w=840&fit=max&auto=format&n=-_xGPoyjhyiDWTPJ&q=85&s=58cfc0341a77e179ce443a89d667784c 840w, https://mintcdn.com/langchain-5e9cc07a/-_xGPoyjhyiDWTPJ/oss/images/checkpoints_full_story.jpg?w=1100&fit=max&auto=format&n=-_xGPoyjhyiDWTPJ&q=85&s=29776799d5a22c3aec7d4a45f675ba14 1100w, https://mintcdn.com/langchain-5e9cc07a/-_xGPoyjhyiDWTPJ/oss/images/checkpoints_full_story.jpg?w=1650&fit=max&auto=format&n=-_xGPoyjhyiDWTPJ&q=85&s=5600d9dd7c52dda79e4eb240c344f84a 1650w, https://mintcdn.com/langchain-5e9cc07a/-_xGPoyjhyiDWTPJ/oss/images/checkpoints_full_story.jpg?w=2500&fit=max&auto=format&n=-_xGPoyjhyiDWTPJ&q=85&s=e428c9c4fc060579c0b7fead1d4a54cb 2500w" />

## Memory store

<img src="https://mintcdn.com/langchain-5e9cc07a/dL5Sn6Cmy9pwtY0V/oss/images/shared_state.png?fit=max&auto=format&n=dL5Sn6Cmy9pwtY0V&q=85&s=354526fb48c5eb11b4b2684a2df40d6c" alt="Model of shared state" data-og-width="1482" width="1482" data-og-height="777" height="777" data-path="oss/images/shared_state.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/langchain-5e9cc07a/dL5Sn6Cmy9pwtY0V/oss/images/shared_state.png?w=280&fit=max&auto=format&n=dL5Sn6Cmy9pwtY0V&q=85&s=1965b83f077aea6301b95b59a9a1e318 280w, https://mintcdn.com/langchain-5e9cc07a/dL5Sn6Cmy9pwtY0V/oss/images/shared_state.png?w=560&fit=max&auto=format&n=dL5Sn6Cmy9pwtY0V&q=85&s=02898a7498e355e04919ac4121678179 560w, https://mintcdn.com/langchain-5e9cc07a/dL5Sn6Cmy9pwtY0V/oss/images/shared_state.png?w=840&fit=max&auto=format&n=dL5Sn6Cmy9pwtY0V&q=85&s=4ef92e64d1151922511c78afde7abdca 840w, https://mintcdn.com/langchain-5e9cc07a/dL5Sn6Cmy9pwtY0V/oss/images/shared_state.png?w=1100&fit=max&auto=format&n=dL5Sn6Cmy9pwtY0V&q=85&s=abddd799a170aa9af9145574e46cff6f 1100w, https://mintcdn.com/langchain-5e9cc07a/dL5Sn6Cmy9pwtY0V/oss/images/shared_state.png?w=1650&fit=max&auto=format&n=dL5Sn6Cmy9pwtY0V&q=85&s=14025324ecb0c462ee1919033d2ae9c5 1650w, https://mintcdn.com/langchain-5e9cc07a/dL5Sn6Cmy9pwtY0V/oss/images/shared_state.png?w=2500&fit=max&auto=format&n=dL5Sn6Cmy9pwtY0V&q=85&s=a4f7989c4392a7ba8160f559d6fd8942 2500w" />

A [state schema](/oss/javascript/langgraph/graph-api#schema) specifies a set of keys that are populated as a graph is executed. As discussed above, state can be written by a checkpointer to a thread at each graph step, enabling state persistence.

But, what if we want to retain some information *across threads*? Consider the case of a chatbot where we want to retain specific information about the user across *all* chat conversations (e.g., threads) with that user!

With checkpointers alone, we cannot share information across threads. This motivates the need for the [`Store`](https://reference.langchain.com/python/langgraph/store/) interface. As an illustration, we can define an `InMemoryStore` to store information about a user across threads. We simply compile our graph with a checkpointer, as before, and with our new `in_memory_store` variable.

<Info>
  **LangGraph API handles stores automatically**
  When using the LangGraph API, you don't need to implement or configure stores manually. The API handles all storage infrastructure for you behind the scenes.
</Info>

### Basic usage

First, let's showcase this in isolation without using LangGraph.

```typescript  theme={null}
import { MemoryStore } from "@langchain/langgraph";

const memoryStore = new MemoryStore();
```

Memories are namespaced by a `tuple`, which in this specific example will be `(<user_id>, "memories")`. The namespace can be any length and represent anything, does not have to be user specific.

```typescript  theme={null}
const userId = "1";
const namespaceForMemory = [userId, "memories"];
```

We use the `store.put` method to save memories to our namespace in the store. When we do this, we specify the namespace, as defined above, and a key-value pair for the memory: the key is simply a unique identifier for the memory (`memory_id`) and the value (a dictionary) is the memory itself.

```typescript  theme={null}
import { v4 as uuidv4 } from "uuid";

const memoryId = uuidv4();
const memory = { food_preference: "I like pizza" };
await memoryStore.put(namespaceForMemory, memoryId, memory);
```

We can read out memories in our namespace using the `store.search` method, which will return all memories for a given user as a list. The most recent memory is the last in the list.

```typescript  theme={null}
const memories = await memoryStore.search(namespaceForMemory);
memories[memories.length - 1];

// {
//   value: { food_preference: 'I like pizza' },
//   key: '07e0caf4-1631-47b7-b15f-65515d4c1843',
//   namespace: ['1', 'memories'],
//   createdAt: '2024-10-02T17:22:31.590602+00:00',
//   updatedAt: '2024-10-02T17:22:31.590605+00:00'
// }
```

The attributes it has are:

* `value`: The value of this memory

* `key`: A unique key for this memory in this namespace

* `namespace`: A tuple of strings, the namespace of this memory type

  <Note>
    While the type is `tuple`, it may be serialized as a list when converted to JSON (for example, `['1', 'memories']`).
  </Note>

* `createdAt`: Timestamp for when this memory was created

* `updatedAt`: Timestamp for when this memory was updated

### Semantic search

Beyond simple retrieval, the store also supports semantic search, allowing you to find memories based on meaning rather than exact matches. To enable this, configure the store with an embedding model:

```typescript  theme={null}
import { OpenAIEmbeddings } from "@langchain/openai";

const store = new InMemoryStore({
  index: {
    embeddings: new OpenAIEmbeddings({ model: "text-embedding-3-small" }),
    dims: 1536,
    fields: ["food_preference", "$"], // Fields to embed
  },
});
```

Now when searching, you can use natural language queries to find relevant memories:

```typescript  theme={null}
// Find memories about food preferences
// (This can be done after putting memories into the store)
const memories = await store.search(namespaceForMemory, {
  query: "What does the user like to eat?",
  limit: 3, // Return top 3 matches
});
```

You can control which parts of your memories get embedded by configuring the `fields` parameter or by specifying the `index` parameter when storing memories:

```typescript  theme={null}
// Store with specific fields to embed
await store.put(
  namespaceForMemory,
  uuidv4(),
  {
    food_preference: "I love Italian cuisine",
    context: "Discussing dinner plans",
  },
  { index: ["food_preference"] } // Only embed "food_preferences" field
);

// Store without embedding (still retrievable, but not searchable)
await store.put(
  namespaceForMemory,
  uuidv4(),
  { system_info: "Last updated: 2024-01-01" },
  { index: false }
);
```

### Using in LangGraph

With this all in place, we use the `memoryStore` in LangGraph. The `memoryStore` works hand-in-hand with the checkpointer: the checkpointer saves state to threads, as discussed above, and the `memoryStore` allows us to store arbitrary information for access *across* threads. We compile the graph with both the checkpointer and the `memoryStore` as follows.

```typescript  theme={null}
import { MemorySaver } from "@langchain/langgraph";

// We need this because we want to enable threads (conversations)
const checkpointer = new MemorySaver();

// ... Define the graph ...

// Compile the graph with the checkpointer and store
const graph = workflow.compile({ checkpointer, store: memoryStore });
```

We invoke the graph with a `thread_id`, as before, and also with a `user_id`, which we'll use to namespace our memories to this particular user as we showed above.

```typescript  theme={null}
// Invoke the graph
const userId = "1";
const config = { configurable: { thread_id: "1", user_id: userId } };

// First let's just say hi to the AI
for await (const update of await graph.stream(
  { messages: [{ role: "user", content: "hi" }] },
  { ...config, streamMode: "updates" }
)) {
  console.log(update);
}
```

We can access the `memoryStore` and the `user_id` in *any node* by accessing `config` and `store` as node arguments. Here's how we might use semantic search in a node to find relevant memories:

```typescript  theme={null}
import { StateSchema, MessagesValue, Runtime } from "@langchain/langgraph";
import { v4 as uuidv4 } from "uuid";

const MessagesState = new StateSchema({
  messages: MessagesValue,
});

const updateMemory: GraphNode<typeof MessagesState> = async (state, runtime) => {
  // Get the user id from the config
  const userId = runtime.context?.user_id;
  if (!userId) throw new Error("User ID is required");

  // Namespace the memory
  const namespace = [userId, "memories"];

  // ... Analyze conversation and create a new memory
  const memory = "Some memory content";

  // Create a new memory ID
  const memoryId = uuidv4();

  // We create a new memory
  await runtime.store?.put(namespace, memoryId, { memory });
};
```

As we showed above, we can also access the store in any node and use the `store.search` method to get memories. Recall the memories are returned as a list of objects that can be converted to a dictionary.

```typescript  theme={null}
memories[memories.length - 1];
// {
//   value: { food_preference: 'I like pizza' },
//   key: '07e0caf4-1631-47b7-b15f-65515d4c1843',
//   namespace: ['1', 'memories'],
//   createdAt: '2024-10-02T17:22:31.590602+00:00',
//   updatedAt: '2024-10-02T17:22:31.590605+00:00'
// }
```

We can access the memories and use them in our model call.

```typescript  theme={null}
const callModel: GraphNode<typeof MessagesState> = async (state, runtime) => {
  // Get the user id from the config
  const userId = runtime.context?.user_id;

  // Namespace the memory
  const namespace = [userId, "memories"];

  // Search based on the most recent message
  const memories = await runtime.store?.search(namespace, {
    query: state.messages[state.messages.length - 1].content,
    limit: 3,
  });
  const info = memories.map((d) => d.value.memory).join("\n");

  // ... Use memories in the model call
};
```

If we create a new thread, we can still access the same memories so long as the `user_id` is the same.

```typescript  theme={null}
// Invoke the graph
const config = { configurable: { thread_id: "2", user_id: "1" } };

// Let's say hi again
for await (const update of await graph.stream(
  { messages: [{ role: "user", content: "hi, tell me about my memories" }] },
  { ...config, streamMode: "updates" }
)) {
  console.log(update);
}
```

When we use the LangSmith, either locally (e.g., in [Studio](/langsmith/studio)) or [hosted with LangSmith](/langsmith/platform-setup), the base store is available to use by default and does not need to be specified during graph compilation. To enable semantic search, however, you **do** need to configure the indexing settings in your `langgraph.json` file. For example:

```json  theme={null}
{
    ...
    "store": {
        "index": {
            "embed": "openai:text-embeddings-3-small",
            "dims": 1536,
            "fields": ["$"]
        }
    }
}
```

See the [deployment guide](/langsmith/semantic-search) for more details and configuration options.

## Checkpointer libraries

Under the hood, checkpointing is powered by checkpointer objects that conform to [`BaseCheckpointSaver`](https://reference.langchain.com/javascript/classes/_langchain_langgraph-checkpoint.BaseCheckpointSaver.html) interface. LangGraph provides several checkpointer implementations, all implemented via standalone, installable libraries:

* `@langchain/langgraph-checkpoint`: The base interface for checkpointer savers ([`BaseCheckpointSaver`](https://reference.langchain.com/javascript/classes/_langchain_langgraph-checkpoint.BaseCheckpointSaver.html)) and serialization/deserialization interface ([`SerializerProtocol`](https://reference.langchain.com/javascript/interfaces/_langchain_langgraph-checkpoint.SerializerProtocol.html)). Includes in-memory checkpointer implementation ([`MemorySaver`](https://reference.langchain.com/javascript/classes/_langchain_langgraph-checkpoint.MemorySaver.html)) for experimentation. LangGraph comes with `@langchain/langgraph-checkpoint` included.
* `@langchain/langgraph-checkpoint-sqlite`: An implementation of LangGraph checkpointer that uses SQLite database ([`SqliteSaver`](https://reference.langchain.com/javascript/classes/_langchain_langgraph-checkpoint-sqlite.SqliteSaver.html)). Ideal for experimentation and local workflows. Needs to be installed separately.
* `@langchain/langgraph-checkpoint-postgres`: An advanced checkpointer that uses Postgres database ([`PostgresSaver`](https://reference.langchain.com/javascript/classes/_langchain_langgraph-checkpoint-postgres.index.PostgresSaver.html)), used in LangSmith. Ideal for using in production. Needs to be installed separately.
* `@langchain/langgraph-checkpoint-mongodb`: An advanced checkpointer that uses MongoDB database (@\[`MongoDBSaver`]). Ideal for using in production. Needs to be installed separately.
* `@langchain/langgraph-checkpoint-redis`: An advanced checkpointer that uses Redis database (@\[`RedisSaver`]). Ideal for using in production. Needs to be installed separately.

### Checkpointer interface

Each checkpointer conforms to the [`BaseCheckpointSaver`](https://reference.langchain.com/javascript/classes/_langchain_langgraph-checkpoint.BaseCheckpointSaver.html) interface and implements the following methods:

* `.put` - Store a checkpoint with its configuration and metadata.
* `.putWrites` - Store intermediate writes linked to a checkpoint (i.e. [pending writes](#pending-writes)).
* `.getTuple` - Fetch a checkpoint tuple using for a given configuration (`thread_id` and `checkpoint_id`). This is used to populate `StateSnapshot` in `graph.getState()`.
* `.list` - List checkpoints that match a given configuration and filter criteria. This is used to populate state history in `graph.getStateHistory()`

## Capabilities

### Human-in-the-loop

First, checkpointers facilitate [human-in-the-loop workflows](/oss/javascript/langgraph/interrupts) by allowing humans to inspect, interrupt, and approve graph steps. Checkpointers are needed for these workflows as the human has to be able to view the state of a graph at any point in time, and the graph has to be to resume execution after the human has made any updates to the state. See [the how-to guides](/oss/javascript/langgraph/interrupts) for examples.

### Memory

Second, checkpointers allow for ["memory"](/oss/javascript/concepts/memory) between interactions. In the case of repeated human interactions (like conversations) any follow up messages can be sent to that thread, which will retain its memory of previous ones. See [Add memory](/oss/javascript/langgraph/add-memory) for information on how to add and manage conversation memory using checkpointers.

### Time travel

Third, checkpointers allow for ["time travel"](/oss/javascript/langgraph/use-time-travel), allowing users to replay prior graph executions to review and / or debug specific graph steps. In addition, checkpointers make it possible to fork the graph state at arbitrary checkpoints to explore alternative trajectories.

### Fault-tolerance

Lastly, checkpointing also provides fault-tolerance and error recovery: if one or more nodes fail at a given superstep, you can restart your graph from the last successful step. Additionally, when a graph node fails mid-execution at a given superstep, LangGraph stores pending checkpoint writes from any other nodes that completed successfully at that superstep, so that whenever we resume graph execution from that superstep we don't re-run the successful nodes.

#### Pending writes

Additionally, when a graph node fails mid-execution at a given superstep, LangGraph stores pending checkpoint writes from any other nodes that completed successfully at that superstep, so that whenever we resume graph execution from that superstep we don't re-run the successful nodes.

***

<Callout icon="pen-to-square" iconType="regular">
  [Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/oss/langgraph/persistence.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).
</Callout>

<Tip icon="terminal" iconType="regular">
  [Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.
</Tip>

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.langchain.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Durable execution

**Durable execution** is a technique in which a process or workflow saves its progress at key points, allowing it to pause and later resume exactly where it left off. This is particularly useful in scenarios that require [human-in-the-loop](/oss/javascript/langgraph/interrupts), where users can inspect, validate, or modify the process before continuing, and in long-running tasks that might encounter interruptions or errors (e.g., calls to an LLM timing out). By preserving completed work, durable execution enables a process to resume without reprocessing previous steps -- even after a significant delay (e.g., a week later).

LangGraph's built-in [persistence](/oss/javascript/langgraph/persistence) layer provides durable execution for workflows, ensuring that the state of each execution step is saved to a durable store. This capability guarantees that if a workflow is interrupted -- whether by a system failure or for [human-in-the-loop](/oss/javascript/langgraph/interrupts) interactions -- it can be resumed from its last recorded state.

<Tip>
  If you are using LangGraph with a checkpointer, you already have durable execution enabled. You can pause and resume workflows at any point, even after interruptions or failures.
  To make the most of durable execution, ensure that your workflow is designed to be [deterministic](#determinism-and-consistent-replay) and [idempotent](#determinism-and-consistent-replay) and wrap any side effects or non-deterministic operations inside [tasks](/oss/javascript/langgraph/functional-api#task). You can use [tasks](/oss/javascript/langgraph/functional-api#task) from both the [StateGraph (Graph API)](/oss/javascript/langgraph/graph-api) and the [Functional API](/oss/javascript/langgraph/functional-api).
</Tip>

## Requirements

To leverage durable execution in LangGraph, you need to:

1. Enable [persistence](/oss/javascript/langgraph/persistence) in your workflow by specifying a [checkpointer](/oss/javascript/langgraph/persistence#checkpointer-libraries) that will save workflow progress.

2. Specify a [thread identifier](/oss/javascript/langgraph/persistence#threads) when executing a workflow. This will track the execution history for a particular instance of the workflow.

3. Wrap any non-deterministic operations (e.g., random number generation) or operations with side effects (e.g., file writes, API calls) inside [tasks](https://reference.langchain.com/javascript/functions/_langchain_langgraph.index.task.html) to ensure that when a workflow is resumed, these operations are not repeated for the particular run, and instead their results are retrieved from the persistence layer. For more information, see [Determinism and Consistent Replay](#determinism-and-consistent-replay).

## Determinism and consistent replay

When you resume a workflow run, the code does **NOT** resume from the **same line of code** where execution stopped; instead, it will identify an appropriate [starting point](#starting-points-for-resuming-workflows) from which to pick up where it left off. This means that the workflow will replay all steps from the [starting point](#starting-points-for-resuming-workflows) until it reaches the point where it was stopped.

As a result, when you are writing a workflow for durable execution, you must wrap any non-deterministic operations (e.g., random number generation) and any operations with side effects (e.g., file writes, API calls) inside [tasks](/oss/javascript/langgraph/functional-api#task) or [nodes](/oss/javascript/langgraph/graph-api#nodes).

To ensure that your workflow is deterministic and can be consistently replayed, follow these guidelines:

* **Avoid Repeating Work**: If a [node](/oss/javascript/langgraph/graph-api#nodes) contains multiple operations with side effects (e.g., logging, file writes, or network calls), wrap each operation in a separate **task**. This ensures that when the workflow is resumed, the operations are not repeated, and their results are retrieved from the persistence layer.
* **Encapsulate Non-Deterministic Operations:** Wrap any code that might yield non-deterministic results (e.g., random number generation) inside **tasks** or **nodes**. This ensures that, upon resumption, the workflow follows the exact recorded sequence of steps with the same outcomes.
* **Use Idempotent Operations**: When possible ensure that side effects (e.g., API calls, file writes) are idempotent. This means that if an operation is retried after a failure in the workflow, it will have the same effect as the first time it was executed. This is particularly important for operations that result in data writes. In the event that a **task** starts but fails to complete successfully, the workflow's resumption will re-run the **task**, relying on recorded outcomes to maintain consistency. Use idempotency keys or verify existing results to avoid unintended duplication, ensuring a smooth and predictable workflow execution.

For some examples of pitfalls to avoid, see the [Common Pitfalls](/oss/javascript/langgraph/functional-api#common-pitfalls) section in the functional API, which shows
how to structure your code using **tasks** to avoid these issues. The same principles apply to the [StateGraph (Graph API)](https://reference.langchain.com/javascript/classes/_langchain_langgraph.index.StateGraph.html).

## Durability modes

LangGraph supports three durability modes that allow you to balance performance and data consistency based on your application's requirements. A higher durability mode adds more overhead to the workflow execution. You can specify the durability mode when calling any graph execution method:

```typescript  theme={null}
await graph.stream(
  { input: "test" },
  { durability: "sync" }
)
```

The durability modes, from least to most durable, are as follows:

* `"exit"`: LangGraph persists changes only when graph execution exits either successfully, with an error, or due to a human in the loop interrupt. This provides the best performance for long-running graphs but means intermediate state is not saved, so you cannot recover from system failures (like process crashes) that occur mid-execution.
* `"async"`: LangGraph persists changes asynchronously while the next step executes. This provides good performance and durability, but there's a small risk that LangGraph does not write checkpoints if the process crashes during execution.
* `"sync"`: LangGraph persists changes synchronously before the next step starts. This ensures that LangGraph writes every checkpoint before continuing execution, providing high durability at the cost of some performance overhead.

## Using tasks in nodes

If a [node](/oss/javascript/langgraph/graph-api#nodes) contains multiple operations, you may find it easier to convert each operation into a **task** rather than refactor the operations into individual nodes.

<Tabs>
  <Tab title="Original">
    ```typescript  theme={null}
    import { StateGraph, StateSchema, GraphNode, START, END, MemorySaver } from "@langchain/langgraph";
    import { v4 as uuidv4 } from "uuid";
    import * as z from "zod";

    // Define a StateSchema to represent the state
    const State = new StateSchema({
      url: z.string(),
      result: z.string().optional(),
    });

    const callApi: GraphNode<typeof State> = async (state) => {
      const response = await fetch(state.url);  // [!code highlight]
      const text = await response.text();
      const result = text.slice(0, 100); // Side-effect
      return {
        result,
      };
    };

    // Create a StateGraph builder and add a node for the callApi function
    const builder = new StateGraph(State)
      .addNode("callApi", callApi)
      .addEdge(START, "callApi")
      .addEdge("callApi", END);

    // Specify a checkpointer
    const checkpointer = new MemorySaver();

    // Compile the graph with the checkpointer
    const graph = builder.compile({ checkpointer });

    // Define a config with a thread ID.
    const threadId = uuidv4();
    const config = { configurable: { thread_id: threadId } };

    // Invoke the graph
    await graph.invoke({ url: "https://www.example.com" }, config);
    ```
  </Tab>

  <Tab title="With task">
    ```typescript  theme={null}
    import { StateGraph, StateSchema, GraphNode, START, END, MemorySaver, task } from "@langchain/langgraph";
    import { v4 as uuidv4 } from "uuid";
    import * as z from "zod";

    // Define a StateSchema to represent the state
    const State = new StateSchema({
      urls: z.array(z.string()),
      results: z.array(z.string()).optional(),
    });

    const makeRequest = task("makeRequest", async (url: string) => {
      const response = await fetch(url);  // [!code highlight]
      const text = await response.text();
      return text.slice(0, 100);
    });

    const callApi: GraphNode<typeof State> = async (state) => {
      const requests = state.urls.map((url) => makeRequest(url));  // [!code highlight]
      const results = await Promise.all(requests);
      return {
        results,
      };
    };

    // Create a StateGraph builder and add a node for the callApi function
    const builder = new StateGraph(State)
      .addNode("callApi", callApi)
      .addEdge(START, "callApi")
      .addEdge("callApi", END);

    // Specify a checkpointer
    const checkpointer = new MemorySaver();

    // Compile the graph with the checkpointer
    const graph = builder.compile({ checkpointer });

    // Define a config with a thread ID.
    const threadId = uuidv4();
    const config = { configurable: { thread_id: threadId } };

    // Invoke the graph
    await graph.invoke({ urls: ["https://www.example.com"] }, config);
    ```
  </Tab>
</Tabs>

## Resuming workflows

Once you have enabled durable execution in your workflow, you can resume execution for the following scenarios:

* **Pausing and Resuming Workflows:** Use the [interrupt](https://reference.langchain.com/javascript/functions/_langchain_langgraph.index.interrupt.html) function to pause a workflow at specific points and the [`Command`](https://reference.langchain.com/javascript/classes/_langchain_langgraph.index.Command.html) primitive to resume it with updated state. See [**Interrupts**](/oss/javascript/langgraph/interrupts) for more details.
* **Recovering from Failures:** Automatically resume workflows from the last successful checkpoint after an exception (e.g., LLM provider outage). This involves executing the workflow with the same thread identifier by providing it with a `null` as the input value (see this [example](/oss/javascript/langgraph/use-functional-api#resuming-after-an-error) with the functional API).

## Starting points for resuming workflows

* If you're using a [StateGraph (Graph API)](/oss/javascript/langgraph/graph-api), the starting point is the beginning of the [**node**](/oss/javascript/langgraph/graph-api#nodes) where execution stopped.
* If you're making a subgraph call inside a node, the starting point will be the **parent** node that called the subgraph that was halted.
  Inside the subgraph, the starting point will be the specific [**node**](/oss/javascript/langgraph/graph-api#nodes) where execution stopped.
* If you're using the Functional API, the starting point is the beginning of the [**entrypoint**](/oss/javascript/langgraph/functional-api#entrypoint) where execution stopped.

***

<Callout icon="pen-to-square" iconType="regular">
  [Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/oss/langgraph/durable-execution.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).
</Callout>

<Tip icon="terminal" iconType="regular">
  [Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.
</Tip>

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.langchain.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Streaming

LangGraph implements a streaming system to surface real-time updates. Streaming is crucial for enhancing the responsiveness of applications built on LLMs. By displaying output progressively, even before a complete response is ready, streaming significantly improves user experience (UX), particularly when dealing with the latency of LLMs.

What's possible with LangGraph streaming:

* <Icon icon="share-nodes" size={16} /> [**Stream graph state**](#stream-graph-state) — get state updates / values with `updates` and `values` modes.
* <Icon icon="square-poll-horizontal" size={16} /> [**Stream subgraph outputs**](#stream-subgraph-outputs) — include outputs from both the parent graph and any nested subgraphs.
* <Icon icon="square-binary" size={16} /> [**Stream LLM tokens**](#messages) — capture token streams from anywhere: inside nodes, subgraphs, or tools.
* <Icon icon="table" size={16} /> [**Stream custom data**](#stream-custom-data) — send custom updates or progress signals directly from tool functions.
* <Icon icon="layer-plus" size={16} /> [**Use multiple streaming modes**](#stream-multiple-modes) — choose from `values` (full state), `updates` (state deltas), `messages` (LLM tokens + metadata), `custom` (arbitrary user data), or `debug` (detailed traces).

## Supported stream modes

Pass one or more of the following stream modes as a list to the [`stream`](https://reference.langchain.com/javascript/classes/_langchain_langgraph.index.CompiledStateGraph.html#stream) method:

| Mode       | Description                                                                                                                                                                         |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `values`   | Streams the full value of the state after each step of the graph.                                                                                                                   |
| `updates`  | Streams the updates to the state after each step of the graph. If multiple updates are made in the same step (e.g., multiple nodes are run), those updates are streamed separately. |
| `custom`   | Streams custom data from inside your graph nodes.                                                                                                                                   |
| `messages` | Streams 2-tuples (LLM token, metadata) from any graph nodes where an LLM is invoked.                                                                                                |
| `debug`    | Streams as much information as possible throughout the execution of the graph.                                                                                                      |

## Basic usage example

LangGraph graphs expose the [`stream`](https://reference.langchain.com/javascript/classes/_langchain_langgraph.pregel.Pregel.html#stream) method to yield streamed outputs as iterators.

```typescript  theme={null}
for await (const chunk of await graph.stream(inputs, {
  streamMode: "updates",
})) {
  console.log(chunk);
}
```

<Accordion title="Extended example: streaming updates">
  ```typescript  theme={null}
  import { StateGraph, StateSchema, START, END } from "@langchain/langgraph";
  import { z } from "zod/v4";

  const State = new StateSchema({
    topic: z.string(),
    joke: z.string(),
  });

  const graph = new StateGraph(State)
    .addNode("refineTopic", (state) => {
      return { topic: state.topic + " and cats" };
    })
    .addNode("generateJoke", (state) => {
      return { joke: `This is a joke about ${state.topic}` };
    })
    .addEdge(START, "refineTopic")
    .addEdge("refineTopic", "generateJoke")
    .addEdge("generateJoke", END)
    .compile();

  for await (const chunk of await graph.stream(
    { topic: "ice cream" },
    // Set streamMode: "updates" to stream only the updates to the graph state after each node
    // Other stream modes are also available. See supported stream modes for details
    { streamMode: "updates" }
  )) {
    console.log(chunk);
  }
  ```

  ```python  theme={null}
  {'refineTopic': {'topic': 'ice cream and cats'}}
  {'generateJoke': {'joke': 'This is a joke about ice cream and cats'}}
  ```
</Accordion>

## Stream multiple modes

You can pass an array as the `streamMode` parameter to stream multiple modes at once.

The streamed outputs will be tuples of `[mode, chunk]` where `mode` is the name of the stream mode and `chunk` is the data streamed by that mode.

```typescript  theme={null}
for await (const [mode, chunk] of await graph.stream(inputs, {
  streamMode: ["updates", "custom"],
})) {
  console.log(chunk);
}
```

## Stream graph state

Use the stream modes `updates` and `values` to stream the state of the graph as it executes.

* `updates` streams the **updates** to the state after each step of the graph.
* `values` streams the **full value** of the state after each step of the graph.

```typescript  theme={null}
import { StateGraph, StateSchema, START, END } from "@langchain/langgraph";
import { z } from "zod/v4";

const State = new StateSchema({
  topic: z.string(),
  joke: z.string(),
});

const graph = new StateGraph(State)
  .addNode("refineTopic", (state) => {
    return { topic: state.topic + " and cats" };
  })
  .addNode("generateJoke", (state) => {
    return { joke: `This is a joke about ${state.topic}` };
  })
  .addEdge(START, "refineTopic")
  .addEdge("refineTopic", "generateJoke")
  .addEdge("generateJoke", END)
  .compile();
```

<Tabs>
  <Tab title="updates">
    Use this to stream only the **state updates** returned by the nodes after each step. The streamed outputs include the name of the node as well as the update.

    ```typescript  theme={null}
    for await (const chunk of await graph.stream(
      { topic: "ice cream" },
      { streamMode: "updates" }
    )) {
      console.log(chunk);
    }
    ```
  </Tab>

  <Tab title="values">
    Use this to stream the **full state** of the graph after each step.

    ```typescript  theme={null}
    for await (const chunk of await graph.stream(
      { topic: "ice cream" },
      { streamMode: "values" }
    )) {
      console.log(chunk);
    }
    ```
  </Tab>
</Tabs>

## Stream subgraph outputs

To include outputs from [subgraphs](/oss/javascript/langgraph/use-subgraphs) in the streamed outputs, you can set `subgraphs: true` in the `.stream()` method of the parent graph. This will stream outputs from both the parent graph and any subgraphs.

The outputs will be streamed as tuples `[namespace, data]`, where `namespace` is a tuple with the path to the node where a subgraph is invoked, e.g. `["parent_node:<task_id>", "child_node:<task_id>"]`.

```typescript  theme={null}
for await (const chunk of await graph.stream(
  { foo: "foo" },
  {
    // Set subgraphs: true to stream outputs from subgraphs
    subgraphs: true,
    streamMode: "updates",
  }
)) {
  console.log(chunk);
}
```

<Accordion title="Extended example: streaming from subgraphs">
  ```typescript  theme={null}
  import { StateGraph, StateSchema, START } from "@langchain/langgraph";
  import { z } from "zod/v4";

  // Define subgraph
  const SubgraphState = new StateSchema({
    foo: z.string(), // note that this key is shared with the parent graph state
    bar: z.string(),
  });

  const subgraphBuilder = new StateGraph(SubgraphState)
    .addNode("subgraphNode1", (state) => {
      return { bar: "bar" };
    })
    .addNode("subgraphNode2", (state) => {
      return { foo: state.foo + state.bar };
    })
    .addEdge(START, "subgraphNode1")
    .addEdge("subgraphNode1", "subgraphNode2");
  const subgraph = subgraphBuilder.compile();

  // Define parent graph
  const ParentState = new StateSchema({
    foo: z.string(),
  });

  const builder = new StateGraph(ParentState)
    .addNode("node1", (state) => {
      return { foo: "hi! " + state.foo };
    })
    .addNode("node2", subgraph)
    .addEdge(START, "node1")
    .addEdge("node1", "node2");
  const graph = builder.compile();

  for await (const chunk of await graph.stream(
    { foo: "foo" },
    {
      streamMode: "updates",
      // Set subgraphs: true to stream outputs from subgraphs
      subgraphs: true,
    }
  )) {
    console.log(chunk);
  }
  ```

  ```
  [[], {'node1': {'foo': 'hi! foo'}}]
  [['node2:dfddc4ba-c3c5-6887-5012-a243b5b377c2'], {'subgraphNode1': {'bar': 'bar'}}]
  [['node2:dfddc4ba-c3c5-6887-5012-a243b5b377c2'], {'subgraphNode2': {'foo': 'hi! foobar'}}]
  [[], {'node2': {'foo': 'hi! foobar'}}]
  ```

  **Note** that we are receiving not just the node updates, but we also the namespaces which tell us what graph (or subgraph) we are streaming from.
</Accordion>

<a id="debug" />

### Debugging

Use the `debug` streaming mode to stream as much information as possible throughout the execution of the graph. The streamed outputs include the name of the node as well as the full state.

```typescript  theme={null}
for await (const chunk of await graph.stream(
  { topic: "ice cream" },
  { streamMode: "debug" }
)) {
  console.log(chunk);
}
```

<a id="messages" />

## LLM tokens

Use the `messages` streaming mode to stream Large Language Model (LLM) outputs **token by token** from any part of your graph, including nodes, tools, subgraphs, or tasks.

The streamed output from [`messages` mode](#supported-stream-modes) is a tuple `[message_chunk, metadata]` where:

* `message_chunk`: the token or message segment from the LLM.
* `metadata`: a dictionary containing details about the graph node and LLM invocation.

> If your LLM is not available as a LangChain integration, you can stream its outputs using `custom` mode instead. See [use with any LLM](#use-with-any-llm) for details.

```typescript  theme={null}
import { ChatOpenAI } from "@langchain/openai";
import { StateGraph, StateSchema, GraphNode, START } from "@langchain/langgraph";
import * as z from "zod";

const MyState = new StateSchema({
  topic: z.string(),
  joke: z.string().default(""),
});

const model = new ChatOpenAI({ model: "gpt-4o-mini" });

const callModel: GraphNode<typeof MyState> = async (state) => {
  // Call the LLM to generate a joke about a topic
  // Note that message events are emitted even when the LLM is run using .invoke rather than .stream
  const modelResponse = await model.invoke([
    { role: "user", content: `Generate a joke about ${state.topic}` },
  ]);
  return { joke: modelResponse.content };
};

const graph = new StateGraph(MyState)
  .addNode("callModel", callModel)
  .addEdge(START, "callModel")
  .compile();

// The "messages" stream mode returns an iterator of tuples [messageChunk, metadata]
// where messageChunk is the token streamed by the LLM and metadata is a dictionary
// with information about the graph node where the LLM was called and other information
for await (const [messageChunk, metadata] of await graph.stream(
  { topic: "ice cream" },
  { streamMode: "messages" }
)) {
  if (messageChunk.content) {
    console.log(messageChunk.content + "|");
  }
}
```

#### Filter by LLM invocation

You can associate `tags` with LLM invocations to filter the streamed tokens by LLM invocation.

```typescript  theme={null}
import { ChatOpenAI } from "@langchain/openai";

// model1 is tagged with "joke"
const model1 = new ChatOpenAI({
  model: "gpt-4o-mini",
  tags: ['joke']
});
// model2 is tagged with "poem"
const model2 = new ChatOpenAI({
  model: "gpt-4o-mini",
  tags: ['poem']
});

const graph = // ... define a graph that uses these LLMs

// The streamMode is set to "messages" to stream LLM tokens
// The metadata contains information about the LLM invocation, including the tags
for await (const [msg, metadata] of await graph.stream(
  { topic: "cats" },
  { streamMode: "messages" }
)) {
  // Filter the streamed tokens by the tags field in the metadata to only include
  // the tokens from the LLM invocation with the "joke" tag
  if (metadata.tags?.includes("joke")) {
    console.log(msg.content + "|");
  }
}
```

<Accordion title="Extended example: filtering by tags">
  ```typescript  theme={null}
  import { ChatOpenAI } from "@langchain/openai";
  import { StateGraph, StateSchema, GraphNode, START } from "@langchain/langgraph";
  import * as z from "zod";

  // The jokeModel is tagged with "joke"
  const jokeModel = new ChatOpenAI({
    model: "gpt-4o-mini",
    tags: ["joke"]
  });
  // The poemModel is tagged with "poem"
  const poemModel = new ChatOpenAI({
    model: "gpt-4o-mini",
    tags: ["poem"]
  });

  const State = new StateSchema({
    topic: z.string(),
    joke: z.string(),
    poem: z.string(),
  });

  const callModel: GraphNode<typeof State> = async (state) => {
    const topic = state.topic;
    console.log("Writing joke...");

    const jokeResponse = await jokeModel.invoke([
      { role: "user", content: `Write a joke about ${topic}` }
    ]);

    console.log("\n\nWriting poem...");
    const poemResponse = await poemModel.invoke([
      { role: "user", content: `Write a short poem about ${topic}` }
    ]);

    return {
      joke: jokeResponse.content,
      poem: poemResponse.content
    };
  };

  const graph = new StateGraph(State)
    .addNode("callModel", callModel)
    .addEdge(START, "callModel")
    .compile();

  // The streamMode is set to "messages" to stream LLM tokens
  // The metadata contains information about the LLM invocation, including the tags
  for await (const [msg, metadata] of await graph.stream(
    { topic: "cats" },
    { streamMode: "messages" }
  )) {
    // Filter the streamed tokens by the tags field in the metadata to only include
    // the tokens from the LLM invocation with the "joke" tag
    if (metadata.tags?.includes("joke")) {
      console.log(msg.content + "|");
    }
  }
  ```
</Accordion>

#### Filter by node

To stream tokens only from specific nodes, use `stream_mode="messages"` and filter the outputs by the `langgraph_node` field in the streamed metadata:

```typescript  theme={null}
// The "messages" stream mode returns a tuple of [messageChunk, metadata]
// where messageChunk is the token streamed by the LLM and metadata is a dictionary
// with information about the graph node where the LLM was called and other information
for await (const [msg, metadata] of await graph.stream(
  inputs,
  { streamMode: "messages" }
)) {
  // Filter the streamed tokens by the langgraph_node field in the metadata
  // to only include the tokens from the specified node
  if (msg.content && metadata.langgraph_node === "some_node_name") {
    // ...
  }
}
```

<Accordion title="Extended example: streaming LLM tokens from specific nodes">
  ```typescript  theme={null}
  import { ChatOpenAI } from "@langchain/openai";
  import { StateGraph, StateSchema, GraphNode, START } from "@langchain/langgraph";
  import * as z from "zod";

  const model = new ChatOpenAI({ model: "gpt-4o-mini" });

  const State = new StateSchema({
    topic: z.string(),
    joke: z.string(),
    poem: z.string(),
  });

  const writeJoke: GraphNode<typeof State> = async (state) => {
    const topic = state.topic;
    const jokeResponse = await model.invoke([
      { role: "user", content: `Write a joke about ${topic}` }
    ]);
    return { joke: jokeResponse.content };
  };

  const writePoem: GraphNode<typeof State> = async (state) => {
    const topic = state.topic;
    const poemResponse = await model.invoke([
      { role: "user", content: `Write a short poem about ${topic}` }
    ]);
    return { poem: poemResponse.content };
  };

  const graph = new StateGraph(State)
    .addNode("writeJoke", writeJoke)
    .addNode("writePoem", writePoem)
    // write both the joke and the poem concurrently
    .addEdge(START, "writeJoke")
    .addEdge(START, "writePoem")
    .compile();

  // The "messages" stream mode returns a tuple of [messageChunk, metadata]
  // where messageChunk is the token streamed by the LLM and metadata is a dictionary
  // with information about the graph node where the LLM was called and other information
  for await (const [msg, metadata] of await graph.stream(
    { topic: "cats" },
    { streamMode: "messages" }
  )) {
    // Filter the streamed tokens by the langgraph_node field in the metadata
    // to only include the tokens from the writePoem node
    if (msg.content && metadata.langgraph_node === "writePoem") {
      console.log(msg.content + "|");
    }
  }
  ```
</Accordion>

## Stream custom data

To send **custom user-defined data** from inside a LangGraph node or tool, follow these steps:

1. Use the `writer` parameter from the `LangGraphRunnableConfig` to emit custom data.
2. Set `streamMode: "custom"` when calling `.stream()` to get the custom data in the stream. You can combine multiple modes (e.g., `["updates", "custom"]`), but at least one must be `"custom"`.

<Tabs>
  <Tab title="node">
    ```typescript  theme={null}
    import { StateGraph, StateSchema, GraphNode, START, LangGraphRunnableConfig } from "@langchain/langgraph";
    import * as z from "zod";

    const State = new StateSchema({
      query: z.string(),
      answer: z.string(),
    });

    const node: GraphNode<typeof State> = async (state, config) => {
      // Use the writer to emit a custom key-value pair (e.g., progress update)
      config.writer({ custom_key: "Generating custom data inside node" });
      return { answer: "some data" };
    };

    const graph = new StateGraph(State)
      .addNode("node", node)
      .addEdge(START, "node")
      .compile();

    const inputs = { query: "example" };

    // Set streamMode: "custom" to receive the custom data in the stream
    for await (const chunk of await graph.stream(inputs, { streamMode: "custom" })) {
      console.log(chunk);
    }
    ```
  </Tab>

  <Tab title="tool">
    ```typescript  theme={null}
    import { tool } from "@langchain/core/tools";
    import { LangGraphRunnableConfig } from "@langchain/langgraph";
    import * as z from "zod";

    const queryDatabase = tool(
      async (input, config: LangGraphRunnableConfig) => {
        // Use the writer to emit a custom key-value pair (e.g., progress update)
        config.writer({ data: "Retrieved 0/100 records", type: "progress" });
        // perform query
        // Emit another custom key-value pair
        config.writer({ data: "Retrieved 100/100 records", type: "progress" });
        return "some-answer";
      },
      {
        name: "query_database",
        description: "Query the database.",
        schema: z.object({
          query: z.string().describe("The query to execute."),
        }),
      }
    );

    const graph = // ... define a graph that uses this tool

    // Set streamMode: "custom" to receive the custom data in the stream
    for await (const chunk of await graph.stream(inputs, { streamMode: "custom" })) {
      console.log(chunk);
    }
    ```
  </Tab>
</Tabs>

## Use with any LLM

You can use `streamMode: "custom"` to stream data from **any LLM API** — even if that API does **not** implement the LangChain chat model interface.

This lets you integrate raw LLM clients or external services that provide their own streaming interfaces, making LangGraph highly flexible for custom setups.

```typescript  theme={null}
import { StateGraph, GraphNode, StateSchema } from "@langchain/langgraph";
import * as z from "zod";

const State = new StateSchema({ result: z.string() });

const callArbitraryModel: GraphNode<typeof State> = async (state, config) => {
  // Example node that calls an arbitrary model and streams the output
  // Assume you have a streaming client that yields chunks
  // Generate LLM tokens using your custom streaming client
  for await (const chunk of yourCustomStreamingClient(state.topic)) {
    // Use the writer to send custom data to the stream
    config.writer({ custom_llm_chunk: chunk });
  }
  return { result: "completed" };
};

const graph = new StateGraph(State)
  .addNode("callArbitraryModel", callArbitraryModel)
  // Add other nodes and edges as needed
  .compile();

// Set streamMode: "custom" to receive the custom data in the stream
for await (const chunk of await graph.stream(
  { topic: "cats" },
  { streamMode: "custom" }
)) {
  // The chunk will contain the custom data streamed from the llm
  console.log(chunk);
}
```

<Accordion title="Extended example: streaming arbitrary chat model">
  ```typescript  theme={null}
  import { StateGraph, StateSchema, MessagesValue, GraphNode, START, LangGraphRunnableConfig } from "@langchain/langgraph";
  import { tool } from "@langchain/core/tools";
  import * as z from "zod";
  import OpenAI from "openai";

  const openaiClient = new OpenAI();
  const modelName = "gpt-4o-mini";

  async function* streamTokens(modelName: string, messages: any[]) {
    const response = await openaiClient.chat.completions.create({
      messages,
      model: modelName,
      stream: true,
    });

    let role: string | null = null;
    for await (const chunk of response) {
      const delta = chunk.choices[0]?.delta;

      if (delta?.role) {
        role = delta.role;
      }

      if (delta?.content) {
        yield { role, content: delta.content };
      }
    }
  }

  // this is our tool
  const getItems = tool(
    async (input, config: LangGraphRunnableConfig) => {
      let response = "";
      for await (const msgChunk of streamTokens(
        modelName,
        [
          {
            role: "user",
            content: `Can you tell me what kind of items i might find in the following place: '${input.place}'. List at least 3 such items separating them by a comma. And include a brief description of each item.`,
          },
        ]
      )) {
        response += msgChunk.content;
        config.writer?.(msgChunk);
      }
      return response;
    },
    {
      name: "get_items",
      description: "Use this tool to list items one might find in a place you're asked about.",
      schema: z.object({
        place: z.string().describe("The place to look up items for."),
      }),
    }
  );

  const State = new StateSchema({
    messages: MessagesValue,
  });

  const callTool: GraphNode<typeof State> = async (state) => {
    const aiMessage = state.messages.at(-1);
    const toolCall = aiMessage.tool_calls?.at(-1);

    const functionName = toolCall?.function?.name;
    if (functionName !== "get_items") {
      throw new Error(`Tool ${functionName} not supported`);
    }

    const functionArguments = toolCall?.function?.arguments;
    const args = JSON.parse(functionArguments);

    const functionResponse = await getItems.invoke(args);
    const toolMessage = {
      tool_call_id: toolCall.id,
      role: "tool",
      name: functionName,
      content: functionResponse,
    };
    return { messages: [toolMessage] };
  };

  const graph = new StateGraph(State)
    // this is the tool-calling graph node
    .addNode("callTool", callTool)
    .addEdge(START, "callTool")
    .compile();
  ```

  Let's invoke the graph with an [`AIMessage`](https://reference.langchain.com/javascript/classes/_langchain_core.messages.AIMessage.html) that includes a tool call:

  ```typescript  theme={null}
  const inputs = {
    messages: [
      {
        content: null,
        role: "assistant",
        tool_calls: [
          {
            id: "1",
            function: {
              arguments: '{"place":"bedroom"}',
              name: "get_items",
            },
            type: "function",
          }
        ],
      }
    ]
  };

  for await (const chunk of await graph.stream(
    inputs,
    { streamMode: "custom" }
  )) {
    console.log(chunk.content + "|");
  }
  ```
</Accordion>

## Disable streaming for specific chat models

If your application mixes models that support streaming with those that do not, you may need to explicitly disable streaming for
models that do not support it.

Set `streaming: false` when initializing the model.

```typescript  theme={null}
import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
  model: "o1-preview",
  // Set streaming: false to disable streaming for the chat model
  streaming: false,
});
```

<Note>
  Not all chat model integrations support the `streaming` parameter. If your model doesn't support it, use `disableStreaming: true` instead. This parameter is available on all chat models via the base class.
</Note>

***

<Callout icon="pen-to-square" iconType="regular">
  [Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/oss/langgraph/streaming.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).
</Callout>

<Tip icon="terminal" iconType="regular">
  [Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.
</Tip>

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.langchain.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Interrupts

Interrupts allow you to pause graph execution at specific points and wait for external input before continuing. This enables human-in-the-loop patterns where you need external input to proceed. When an interrupt is triggered, LangGraph saves the graph state using its [persistence](/oss/javascript/langgraph/persistence) layer and waits indefinitely until you resume execution.

Interrupts work by calling the `interrupt()` function at any point in your graph nodes. The function accepts any JSON-serializable value which is surfaced to the caller. When you're ready to continue, you resume execution by re-invoking the graph using `Command`, which then becomes the return value of the `interrupt()` call from inside the node.

Unlike static breakpoints (which pause before or after specific nodes), interrupts are **dynamic**—they can be placed anywhere in your code and can be conditional based on your application logic.

* **Checkpointing keeps your place:** the checkpointer writes the exact graph state so you can resume later, even when in an error state.
* **`thread_id` is your pointer:** use `{ configurable: { thread_id: ... } }` as options to the `invoke` method to tell the checkpointer which state to load.
* **Interrupt payloads surface as `__interrupt__`:** the values you pass to `interrupt()` return to the caller in the `__interrupt__` field so you know what the graph is waiting on.

The `thread_id` you choose is effectively your persistent cursor. Reusing it resumes the same checkpoint; using a new value starts a brand-new thread with an empty state.

## Pause using `interrupt`

The [`interrupt`](https://reference.langchain.com/javascript/functions/_langchain_langgraph.index.interrupt.html) function pauses graph execution and returns a value to the caller. When you call [`interrupt`](https://reference.langchain.com/javascript/functions/_langchain_langgraph.index.interrupt.html) within a node, LangGraph saves the current graph state and waits for you to resume execution with input.

To use [`interrupt`](https://reference.langchain.com/javascript/functions/_langchain_langgraph.index.interrupt.html), you need:

1. A **checkpointer** to persist the graph state (use a durable checkpointer in production)
2. A **thread ID** in your config so the runtime knows which state to resume from
3. To call `interrupt()` where you want to pause (payload must be JSON-serializable)

```typescript  theme={null}
import { interrupt } from "@langchain/langgraph";

async function approvalNode(state: State) {
    // Pause and ask for approval
    const approved = interrupt("Do you approve this action?");

    // Command({ resume: ... }) provides the value returned into this variable
    return { approved };
}
```

When you call [`interrupt`](https://reference.langchain.com/javascript/functions/_langchain_langgraph.index.interrupt.html), here's what happens:

1. **Graph execution gets suspended** at the exact point where [`interrupt`](https://reference.langchain.com/javascript/functions/_langchain_langgraph.index.interrupt.html) is called
2. **State is saved** using the checkpointer so execution can be resumed later, In production, this should be a persistent checkpointer (e.g. backed by a database)
3. **Value is returned** to the caller under `__interrupt__`; it can be any JSON-serializable value (string, object, array, etc.)
4. **Graph waits indefinitely** until you resume execution with a response
5. **Response is passed back** into the node when you resume, becoming the return value of the `interrupt()` call

## Resuming interrupts

After an interrupt pauses execution, you resume the graph by invoking it again with a `Command` that contains the resume value. The resume value is passed back to the `interrupt` call, allowing the node to continue execution with the external input.

```typescript  theme={null}
import { Command } from "@langchain/langgraph";

// Initial run - hits the interrupt and pauses
// thread_id is the durable pointer back to the saved checkpoint
const config = { configurable: { thread_id: "thread-1" } };
const result = await graph.invoke({ input: "data" }, config);

// Check what was interrupted
// __interrupt__ mirrors every payload you passed to interrupt()
console.log(result.__interrupt__);
// [{ value: 'Do you approve this action?', ... }]

// Resume with the human's response
// Command({ resume }) returns that value from interrupt() in the node
await graph.invoke(new Command({ resume: true }), config);
```

**Key points about resuming:**

* You must use the **same thread ID** when resuming that was used when the interrupt occurred
* The value passed to `new Command({ resume: ... })` becomes the return value of the [`interrupt`](https://reference.langchain.com/javascript/functions/_langchain_langgraph.index.interrupt.html) call
* The node restarts from the beginning of the node where the [`interrupt`](https://reference.langchain.com/javascript/functions/_langchain_langgraph.index.interrupt.html) was called when resumed, so any code before the [`interrupt`](https://reference.langchain.com/javascript/functions/_langchain_langgraph.index.interrupt.html) runs again
* You can pass any JSON-serializable value as the resume value

## Common patterns

The key thing that interrupts unlock is the ability to pause execution and wait for external input. This is useful for a variety of use cases, including:

* <Icon icon="check-circle" /> [Approval workflows](#approve-or-reject): Pause before executing critical actions (API calls, database changes, financial transactions)
* <Icon icon="pencil" /> [Review and edit](#review-and-edit-state): Let humans review and modify LLM outputs or tool calls before continuing
* <Icon icon="wrench" /> [Interrupting tool calls](#interrupts-in-tools): Pause before executing tool calls to review and edit the tool call before execution
* <Icon icon="shield-check" /> [Validating human input](#validating-human-input): Pause before proceeding to the next step to validate human input

### Stream with human-in-the-loop (HITL) interrupts

When building interactive agents with human-in-the-loop workflows, you can stream both message chunks and node updates simultaneously to provide real-time feedback while handling interrupts.

Use multiple stream modes (`"messages"` and `"updates"`) with `subgraphs=True` (if subgraphs are present) to:

* Stream AI responses in real-time as they're generated
* Detect when the graph encounters an interrupt
* Handle user input and resume execution seamlessly

```python  theme={null}
async for metadata, mode, chunk in graph.astream(
    initial_input,
    stream_mode=["messages", "updates"],
    subgraphs=True,
    config=config
):
    if mode == "messages":
        # Handle streaming message content
        msg, _ = chunk
        if isinstance(msg, AIMessageChunk) and msg.content:
            # Display content in real-time
            display_streaming_content(msg.content)
    
    elif mode == "updates":
        # Check for interrupts
        if "__interrupt__" in chunk:
            # Stop streaming display
            interrupt_info = chunk["__interrupt__"][0].value
            
            # Handle user input
            user_response = get_user_input(interrupt_info)
            
            # Resume graph with updated input
            initial_input = Command(resume=user_response)
            break
        
        else:
            # Track node transitions
            current_node = list(chunk.keys())[0]
```

* **`stream_mode=["messages", "updates"]`**: Enables dual streaming of both message chunks and graph state updates
* **`subgraphs=True`**: Required for interrupt detection in nested graphs
* **`"__interrupt__"` detection**: Signals when human input is needed
* **`Command(resume=...)`**: Resumes graph execution with user-provided data

### Approve or reject

One of the most common uses of interrupts is to pause before a critical action and ask for approval. For example, you might want to ask a human to approve an API call, a database change, or any other important decision.

```typescript  theme={null}
import { interrupt, Command } from "@langchain/langgraph";

const approvalNode: typeof State.Node = (state) => {
  // Pause execution; payload surfaces in result.__interrupt__
  const isApproved = interrupt({
    question: "Do you want to proceed?",
    details: state.actionDetails
  });

  // Route based on the response
  if (isApproved) {
    return new Command({ goto: "proceed" }); // Runs after the resume payload is provided
  } else {
    return new Command({ goto: "cancel" });
  }
}
```

When you resume the graph, pass `true` to approve or `false` to reject:

```typescript  theme={null}
// To approve
await graph.invoke(new Command({ resume: true }), config);

// To reject
await graph.invoke(new Command({ resume: false }), config);
```

<Accordion title="Full example">
  ```typescript  theme={null}
  import {
    Command,
    MemorySaver,
    START,
    END,
    StateGraph,
    StateSchema,
    interrupt,
  } from "@langchain/langgraph";
  import * as z from "zod";

  const State = new StateSchema({
    actionDetails: z.string(),
    status: z.enum(["pending", "approved", "rejected"]).nullable(),
  });

  const graphBuilder = new StateGraph(State)
    .addNode("approval", async (state) => {
      // Expose details so the caller can render them in a UI
      const decision = interrupt({
        question: "Approve this action?",
        details: state.actionDetails,
      });
      return new Command({ goto: decision ? "proceed" : "cancel" });
    }, { ends: ['proceed', 'cancel'] })
    .addNode("proceed", () => ({ status: "approved" }))
    .addNode("cancel", () => ({ status: "rejected" }))
    .addEdge(START, "approval")
    .addEdge("proceed", END)
    .addEdge("cancel", END);

  // Use a more durable checkpointer in production
  const checkpointer = new MemorySaver();
  const graph = graphBuilder.compile({ checkpointer });

  const config = { configurable: { thread_id: "approval-123" } };
  const initial = await graph.invoke(
    { actionDetails: "Transfer $500", status: "pending" },
    config,
  );
  console.log(initial.__interrupt__);
  // [{ value: { question: ..., details: ... } }]

  // Resume with the decision; true routes to proceed, false to cancel
  const resumed = await graph.invoke(new Command({ resume: true }), config);
  console.log(resumed.status); // -> "approved"
  ```
</Accordion>

### Review and edit state

Sometimes you want to let a human review and edit part of the graph state before continuing. This is useful for correcting LLMs, adding missing information, or making adjustments.

```typescript  theme={null}
import { interrupt } from "@langchain/langgraph";

const reviewNode: typeof State.Node = (state) => {
  // Pause and show the current content for review (surfaces in result.__interrupt__)
  const editedContent = interrupt({
    instruction: "Review and edit this content",
    content: state.generatedText
  });

  // Update the state with the edited version
  return { generatedText: editedContent };
}
```

When resuming, provide the edited content:

```typescript  theme={null}
await graph.invoke(
  new Command({ resume: "The edited and improved text" }), // Value becomes the return from interrupt()
  config
);
```

<Accordion title="Full example">
  ```typescript  theme={null}
  import {
    Command,
    MemorySaver,
    START,
    END,
    StateGraph,
    StateSchema,
    interrupt,
  } from "@langchain/langgraph";
  import * as z from "zod";

  const State = new StateSchema({
    generatedText: z.string(),
  });

  const builder = new StateGraph(State)
    .addNode("review", async (state) => {
      // Ask a reviewer to edit the generated content
      const updated = interrupt({
        instruction: "Review and edit this content",
        content: state.generatedText,
      });
      return { generatedText: updated };
    })
    .addEdge(START, "review")
    .addEdge("review", END);

  const checkpointer = new MemorySaver();
  const graph = builder.compile({ checkpointer });

  const config = { configurable: { thread_id: "review-42" } };
  const initial = await graph.invoke({ generatedText: "Initial draft" }, config);
  console.log(initial.__interrupt__);
  // [{ value: { instruction: ..., content: ... } }]

  // Resume with the edited text from the reviewer
  const finalState = await graph.invoke(
    new Command({ resume: "Improved draft after review" }),
    config,
  );
  console.log(finalState.generatedText); // -> "Improved draft after review"
  ```
</Accordion>

### Interrupts in tools

You can also place interrupts directly inside tool functions. This makes the tool itself pause for approval whenever it's called, and allows for human review and editing of the tool call before it is executed.

First, define a tool that uses [`interrupt`](https://reference.langchain.com/javascript/functions/_langchain_langgraph.index.interrupt.html):

```typescript  theme={null}
import { tool } from "@langchain/core/tools";
import { interrupt } from "@langchain/langgraph";
import * as z from "zod";

const sendEmailTool = tool(
  async ({ to, subject, body }) => {
    // Pause before sending; payload surfaces in result.__interrupt__
    const response = interrupt({
      action: "send_email",
      to,
      subject,
      body,
      message: "Approve sending this email?",
    });

    if (response?.action === "approve") {
      // Resume value can override inputs before executing
      const finalTo = response.to ?? to;
      const finalSubject = response.subject ?? subject;
      const finalBody = response.body ?? body;
      return `Email sent to ${finalTo} with subject '${finalSubject}'`;
    }
    return "Email cancelled by user";
  },
  {
    name: "send_email",
    description: "Send an email to a recipient",
    schema: z.object({
      to: z.string(),
      subject: z.string(),
      body: z.string(),
    }),
  },
);
```

This approach is useful when you want the approval logic to live with the tool itself, making it reusable across different parts of your graph. The LLM can call the tool naturally, and the interrupt will pause execution whenever the tool is invoked, allowing you to approve, edit, or cancel the action.

<Accordion title="Full example">
  ```typescript  theme={null}
  import { tool } from "@langchain/core/tools";
  import { ChatAnthropic } from "@langchain/anthropic";
  import {
    Command,
    MemorySaver,
    START,
    END,
    StateGraph,
    StateSchema,
    MessagesValue,
    GraphNode,
    interrupt,
  } from "@langchain/langgraph";
  import * as z from "zod";

  const sendEmailTool = tool(
    async ({ to, subject, body }) => {
      // Pause before sending; payload surfaces in result.__interrupt__
      const response = interrupt({
        action: "send_email",
        to,
        subject,
        body,
        message: "Approve sending this email?",
      });

      if (response?.action === "approve") {
        const finalTo = response.to ?? to;
        const finalSubject = response.subject ?? subject;
        const finalBody = response.body ?? body;
        console.log("[sendEmailTool]", finalTo, finalSubject, finalBody);
        return `Email sent to ${finalTo}`;
      }
      return "Email cancelled by user";
    },
    {
      name: "send_email",
      description: "Send an email to a recipient",
      schema: z.object({
        to: z.string(),
        subject: z.string(),
        body: z.string(),
      }),
    },
  );

  const model = new ChatAnthropic({ model: "claude-sonnet-4-5-20250929" }).bindTools([sendEmailTool]);

  const State = new StateSchema({
    messages: MessagesValue,
  });

  const agent: typeof State.Node = async (state) => {
    // LLM may decide to call the tool; interrupt pauses before sending
    const response = await model.invoke(state.messages);
    return { messages: [response] };
  };

  const graphBuilder = new StateGraph(State)
    .addNode("agent", agent)
    .addEdge(START, "agent")
    .addEdge("agent", END);

  const checkpointer = new MemorySaver();
  const graph = graphBuilder.compile({ checkpointer });

  const config = { configurable: { thread_id: "email-workflow" } };
  const initial = await graph.invoke(
    {
      messages: [
        { role: "user", content: "Send an email to alice@example.com about the meeting" },
      ],
    },
    config,
  );
  console.log(initial.__interrupt__); // -> [{ value: { action: 'send_email', ... } }]

  // Resume with approval and optionally edited arguments
  const resumed = await graph.invoke(
    new Command({
      resume: { action: "approve", subject: "Updated subject" },
    }),
    config,
  );
  console.log(resumed.messages.at(-1)); // -> Tool result returned by send_email
  ```
</Accordion>

### Validating human input

Sometimes you need to validate input from humans and ask again if it's invalid. You can do this using multiple [`interrupt`](https://reference.langchain.com/javascript/functions/_langchain_langgraph.index.interrupt.html) calls in a loop.

```typescript  theme={null}
import { interrupt } from "@langchain/langgraph";

const getAgeNode: typeof State.Node = (state) => {
  let prompt = "What is your age?";

  while (true) {
    const answer = interrupt(prompt); // payload surfaces in result.__interrupt__

    // Validate the input
    if (typeof answer === "number" && answer > 0) {
      // Valid input - continue
      return { age: answer };
    } else {
      // Invalid input - ask again with a more specific prompt
      prompt = `'${answer}' is not a valid age. Please enter a positive number.`;
    }
  }
}
```

Each time you resume the graph with invalid input, it will ask again with a clearer message. Once valid input is provided, the node completes and the graph continues.

<Accordion title="Full example">
  ```typescript  theme={null}
  import {
    Command,
    MemorySaver,
    START,
    END,
    StateGraph,
    StateSchema,
    interrupt,
  } from "@langchain/langgraph";
  import * as z from "zod";

  const State = new StateSchema({
    age: z.number().nullable(),
  });

  const builder = new StateGraph(State)
    .addNode("collectAge", (state) => {
      let prompt = "What is your age?";

      while (true) {
        const answer = interrupt(prompt); // payload surfaces in result.__interrupt__

        if (typeof answer === "number" && answer > 0) {
          return { age: answer };
        }

        prompt = `'${answer}' is not a valid age. Please enter a positive number.`;
      }
    })
    .addEdge(START, "collectAge")
    .addEdge("collectAge", END);

  const checkpointer = new MemorySaver();
  const graph = builder.compile({ checkpointer });

  const config = { configurable: { thread_id: "form-1" } };
  const first = await graph.invoke({ age: null }, config);
  console.log(first.__interrupt__); // -> [{ value: "What is your age?", ... }]

  // Provide invalid data; the node re-prompts
  const retry = await graph.invoke(new Command({ resume: "thirty" }), config);
  console.log(retry.__interrupt__); // -> [{ value: "'thirty' is not a valid age...", ... }]

  // Provide valid data; loop exits and state updates
  const final = await graph.invoke(new Command({ resume: 30 }), config);
  console.log(final.age); // -> 30
  ```
</Accordion>

## Rules of interrupts

When you call [`interrupt`](https://reference.langchain.com/javascript/functions/_langchain_langgraph.index.interrupt.html) within a node, LangGraph suspends execution by raising an exception that signals the runtime to pause. This exception propagates up through the call stack and is caught by the runtime, which notifies the graph to save the current state and wait for external input.

When execution resumes (after you provide the requested input), the runtime restarts the entire node from the beginning—it does not resume from the exact line where [`interrupt`](https://reference.langchain.com/javascript/functions/_langchain_langgraph.index.interrupt.html) was called. This means any code that ran before the [`interrupt`](https://reference.langchain.com/javascript/functions/_langchain_langgraph.index.interrupt.html) will execute again. Because of this, there's a few important rules to follow when working with interrupts to ensure they behave as expected.

### Do not wrap `interrupt` calls in try/catch

The way that [`interrupt`](https://reference.langchain.com/javascript/functions/_langchain_langgraph.index.interrupt.html) pauses execution at the point of the call is by throwing a special exception. If you wrap the [`interrupt`](https://reference.langchain.com/javascript/functions/_langchain_langgraph.index.interrupt.html) call in a try/catch block, you will catch this exception and the interrupt will not be passed back to the graph.

* ✅ Separate [`interrupt`](https://reference.langchain.com/javascript/functions/_langchain_langgraph.index.interrupt.html) calls from error-prone code
* ✅ Conditionally catch errors if needed

<CodeGroup>
  ```typescript Separating logic theme={null}
  const nodeA: GraphNode<typeof State> = async (state) => {
    // ✅ Good: interrupting first, then handling error conditions separately
    const name = interrupt("What's your name?");
    try {
      await fetchData(); // This can fail
    } catch (err) {
      console.error(error);
    }
    return state;
  }
  ```

  ```typescript Conditionally handling errors theme={null}
  const nodeA: GraphNode<typeof State> = async (state) => {
    // ✅ Good: re-throwing the exception will
    // allow the interrupt to be passed back to
    // the graph
    try {
      const name = interrupt("What's your name?");
      await fetchData(); // This can fail
    } catch (err) {
      if (error instanceof NetworkError) {
        console.error(error);
      }
      throw error;
    }
    return state;
  }
  ```
</CodeGroup>

* 🔴 Do not wrap [`interrupt`](https://reference.langchain.com/javascript/functions/_langchain_langgraph.index.interrupt.html) calls in bare try/catch blocks

```typescript  theme={null}
async function nodeA(state: State) {
    // ❌ Bad: wrapping interrupt in bare try/catch will catch the interrupt exception
    try {
        const name = interrupt("What's your name?");
    } catch (err) {
        console.error(error);
    }
    return state;
}
```

### Do not reorder `interrupt` calls within a node

It's common to use multiple interrupts in a single node, however this can lead to unexpected behavior if not handled carefully.

When a node contains multiple interrupt calls, LangGraph keeps a list of resume values specific to the task executing the node. Whenever execution resumes, it starts at the beginning of the node. For each interrupt encountered, LangGraph checks if a matching value exists in the task's resume list. Matching is **strictly index-based**, so the order of interrupt calls within the node is important.

* ✅ Keep [`interrupt`](https://reference.langchain.com/javascript/functions/_langchain_langgraph.index.interrupt.html) calls consistent across node executions

```typescript  theme={null}
async function nodeA(state: State) {
    // ✅ Good: interrupt calls happen in the same order every time
    const name = interrupt("What's your name?");
    const age = interrupt("What's your age?");
    const city = interrupt("What's your city?");

    return {
        name,
        age,
        city
    };
}
```

* 🔴 Do not conditionally skip [`interrupt`](https://reference.langchain.com/javascript/functions/_langchain_langgraph.index.interrupt.html) calls within a node
* 🔴 Do not loop [`interrupt`](https://reference.langchain.com/javascript/functions/_langchain_langgraph.index.interrupt.html) calls using logic that isn't deterministic across executions

<CodeGroup>
  ```typescript Skipping interrupts theme={null}
  const nodeA: GraphNode<typeof State> = async (state) => {
    // ❌ Bad: conditionally skipping interrupts changes the order
    const name = interrupt("What's your name?");

    // On first run, this might skip the interrupt
    // On resume, it might not skip it - causing index mismatch
    if (state.needsAge) {
      const age = interrupt("What's your age?");
    }

    const city = interrupt("What's your city?");

    return { name, city };
  }
  ```

  ```typescript Looping interrupts theme={null}
  const nodeA: GraphNode<typeof State> = async (state) => {
    // ❌ Bad: looping based on non-deterministic data
    // The number of interrupts changes between executions
    const results = [];
    for (const item of state.dynamicList || []) {  // List might change between runs
      const result = interrupt(`Approve ${item}?`);
      results.push(result);
    }

    return { results };
  }
  ```
</CodeGroup>

### Do not return complex values in `interrupt` calls

Depending on which checkpointer is used, complex values may not be serializable (e.g. you can't serialize a function). To make your graphs adaptable to any deployment, it's best practice to only use values that can be reasonably serialized.

* ✅ Pass simple, JSON-serializable types to [`interrupt`](https://reference.langchain.com/javascript/functions/_langchain_langgraph.index.interrupt.html)
* ✅ Pass dictionaries/objects with simple values

<CodeGroup>
  ```typescript Simple values theme={null}
  const nodeA: GraphNode<typeof State> = async (state) => {
    // ✅ Good: passing simple types that are serializable
    const name = interrupt("What's your name?");
    const count = interrupt(42);
    const approved = interrupt(true);

    return { name, count, approved };
  }
  ```

  ```typescript Structured data theme={null}
  const nodeA: GraphNode<typeof State> = async (state) => {
    // ✅ Good: passing objects with simple values
    const response = interrupt({
      question: "Enter user details",
      fields: ["name", "email", "age"],
      currentValues: state.user || {}
    });

    return { user: response };
  }
  ```
</CodeGroup>

* 🔴 Do not pass functions, class instances, or other complex objects to [`interrupt`](https://reference.langchain.com/javascript/functions/_langchain_langgraph.index.interrupt.html)

<CodeGroup>
  ```typescript Functions theme={null}
  function validateInput(value: string): boolean {
      return value.length > 0;
  }

  const nodeA: GraphNode<typeof State> = async (state) => {
    // ❌ Bad: passing a function to interrupt
    // The function cannot be serialized
    const response = interrupt({
      question: "What's your name?",
      validator: validateInput  // This will fail
    });
    return { name: response };
  }
  ```

  ```typescript Class instances theme={null}
  class DataProcessor {
      constructor(private config: any) {}
  }

  const nodeA: GraphNode<typeof State> = async (state) => {
    const processor = new DataProcessor({ mode: "strict" });

    // ❌ Bad: passing a class instance to interrupt
    // The instance cannot be serialized
    const response = interrupt({
      question: "Enter data to process",
      processor: processor  // This will fail
    });
    return { result: response };
  }
  ```
</CodeGroup>

### Side effects called before `interrupt` must be idempotent

Because interrupts work by re-running the nodes they were called from, side effects called before [`interrupt`](https://reference.langchain.com/javascript/functions/_langchain_langgraph.index.interrupt.html) should (ideally) be idempotent. For context, idempotency means that the same operation can be applied multiple times without changing the result beyond the initial execution.

As an example, you might have an API call to update a record inside of a node. If [`interrupt`](https://reference.langchain.com/javascript/functions/_langchain_langgraph.index.interrupt.html) is called after that call is made, it will be re-run multiple times when the node is resumed, potentially overwriting the initial update or creating duplicate records.

* ✅ Use idempotent operations before [`interrupt`](https://reference.langchain.com/javascript/functions/_langchain_langgraph.index.interrupt.html)
* ✅ Place side effects after [`interrupt`](https://reference.langchain.com/javascript/functions/_langchain_langgraph.index.interrupt.html) calls
* ✅ Separate side effects into separate nodes when possible

<CodeGroup>
  ```typescript Idempotent operations theme={null}
  const nodeA: GraphNode<typeof State> = async (state) => {
    // ✅ Good: using upsert operation which is idempotent
    // Running this multiple times will have the same result
    await db.upsertUser({
      userId: state.userId,
      status: "pending_approval"
    });

    const approved = interrupt("Approve this change?");

    return { approved };
  }
  ```

  ```typescript Side effects after interrupt theme={null}
  const nodeA: GraphNode<typeof State> = async (state) => {
    // ✅ Good: placing side effect after the interrupt
    // This ensures it only runs once after approval is received
    const approved = interrupt("Approve this change?");

    if (approved) {
      await db.createAuditLog({
        userId: state.userId,
        action: "approved"
      });
    }

    return { approved };
  }
  ```

  ```typescript Separating into different nodes theme={null}
  const approvalNode: GraphNode<typeof State> = async (state) => {
    // ✅ Good: only handling the interrupt in this node
    const approved = interrupt("Approve this change?");

    return { approved };
  }

  const notificationNode: GraphNode<typeof State> = async (state) => {
    // ✅ Good: side effect happens in a separate node
    // This runs after approval, so it only executes once
    if (state.approved) {
      await sendNotification({
        userId: state.userId,
        status: "approved",
      });
    }

    return state;
  }
  ```
</CodeGroup>

* 🔴 Do not perform non-idempotent operations before [`interrupt`](https://reference.langchain.com/javascript/functions/_langchain_langgraph.index.interrupt.html)
* 🔴 Do not create new records without checking if they exist

<CodeGroup>
  ```typescript Creating records theme={null}
  const nodeA: GraphNode<typeof State> = async (state) => {
    // ❌ Bad: creating a new record before interrupt
    // This will create duplicate records on each resume
    const auditId = await db.createAuditLog({
      userId: state.userId,
      action: "pending_approval",
      timestamp: new Date()
    });

    const approved = interrupt("Approve this change?");

    return { approved, auditId };
  }
  ```

  ```typescript Appending to arrays theme={null}
  const nodeA: GraphNode<typeof State> = async (state) => {
    // ❌ Bad: appending to an array before interrupt
    // This will add duplicate entries on each resume
    await db.appendToHistory(state.userId, "approval_requested");

    const approved = interrupt("Approve this change?");

    return { approved };
  }
  ```
</CodeGroup>

## Using with subgraphs called as functions

When invoking a subgraph within a node, the parent graph will resume execution from the **beginning of the node** where the subgraph was invoked and the [`interrupt`](https://reference.langchain.com/javascript/functions/_langchain_langgraph.index.interrupt.html) was triggered. Similarly, the **subgraph** will also resume from the beginning of the node where [`interrupt`](https://reference.langchain.com/javascript/functions/_langchain_langgraph.index.interrupt.html) was called.

```typescript  theme={null}
async function nodeInParentGraph(state: State) {
    someCode(); // <-- This will re-execute when resumed
    // Invoke a subgraph as a function.
    // The subgraph contains an `interrupt` call.
    const subgraphResult = await subgraph.invoke(someInput);
    // ...
}

async function nodeInSubgraph(state: State) {
    someOtherCode(); // <-- This will also re-execute when resumed
    const result = interrupt("What's your name?");
    // ...
}
```

## Debugging with interrupts

To debug and test a graph, you can use static interrupts as breakpoints to step through the graph execution one node at a time. Static interrupts are triggered at defined points either before or after a node executes. You can set these by specifying `interruptBefore` and `interruptAfter` when compiling the graph.

<Note>
  Static interrupts are **not** recommended for human-in-the-loop workflows. Use the [`interrupt`](https://reference.langchain.com/javascript/functions/_langchain_langgraph.index.interrupt.html) function instead.
</Note>

<Tabs>
  <Tab title="At compile time">
    ```typescript  theme={null}
    const graph = builder.compile({
        interruptBefore: ["node_a"],  // [!code highlight]
        interruptAfter: ["node_b", "node_c"],  // [!code highlight]
        checkpointer,
    });

    // Pass a thread ID to the graph
    const config = {
        configurable: {
            thread_id: "some_thread"
        }
    };

    // Run the graph until the breakpoint
    await graph.invoke(inputs, config);# [!code highlight]

    await graph.invoke(null, config);  # [!code highlight]
    ```

    1. The breakpoints are set during `compile` time.
    2. `interruptBefore` specifies the nodes where execution should pause before the node is executed.
    3. `interruptAfter` specifies the nodes where execution should pause after the node is executed.
    4. A checkpointer is required to enable breakpoints.
    5. The graph is run until the first breakpoint is hit.
    6. The graph is resumed by passing in `null` for the input. This will run the graph until the next breakpoint is hit.
  </Tab>

  <Tab title="At run time">
    ```typescript  theme={null}
    // Run the graph until the breakpoint
    graph.invoke(inputs, {
        interruptBefore: ["node_a"],  // [!code highlight]
        interruptAfter: ["node_b", "node_c"],  // [!code highlight]
        configurable: {
            thread_id: "some_thread"
        }
    });

    // Resume the graph
    await graph.invoke(null, config);  // [!code highlight]
    ```

    1. `graph.invoke` is called with the `interruptBefore` and `interruptAfter` parameters. This is a run-time configuration and can be changed for every invocation.
    2. `interruptBefore` specifies the nodes where execution should pause before the node is executed.
    3. `interruptAfter` specifies the nodes where execution should pause after the node is executed.
    4. The graph is run until the first breakpoint is hit.
    5. The graph is resumed by passing in `null` for the input. This will run the graph until the next breakpoint is hit.
  </Tab>
</Tabs>

### Using LangSmith Studio

You can use [LangSmith Studio](/langsmith/studio) to set static interrupts in your graph in the UI before running the graph. You can also use the UI to inspect the graph state at any point in the execution.

<img src="https://mintcdn.com/langchain-5e9cc07a/dL5Sn6Cmy9pwtY0V/oss/images/static-interrupt.png?fit=max&auto=format&n=dL5Sn6Cmy9pwtY0V&q=85&s=5aa4e7cea2ab147cef5b4e210dd6c4a1" alt="image" data-og-width="1252" width="1252" data-og-height="1040" height="1040" data-path="oss/images/static-interrupt.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/langchain-5e9cc07a/dL5Sn6Cmy9pwtY0V/oss/images/static-interrupt.png?w=280&fit=max&auto=format&n=dL5Sn6Cmy9pwtY0V&q=85&s=52d02b507d0a6a879f7fb88d9c6767d0 280w, https://mintcdn.com/langchain-5e9cc07a/dL5Sn6Cmy9pwtY0V/oss/images/static-interrupt.png?w=560&fit=max&auto=format&n=dL5Sn6Cmy9pwtY0V&q=85&s=e363cd4980edff9bab422f4f1c0ee3c8 560w, https://mintcdn.com/langchain-5e9cc07a/dL5Sn6Cmy9pwtY0V/oss/images/static-interrupt.png?w=840&fit=max&auto=format&n=dL5Sn6Cmy9pwtY0V&q=85&s=49d26a3641953c23ef3fbc51e828c305 840w, https://mintcdn.com/langchain-5e9cc07a/dL5Sn6Cmy9pwtY0V/oss/images/static-interrupt.png?w=1100&fit=max&auto=format&n=dL5Sn6Cmy9pwtY0V&q=85&s=2dba15683b3baa1a61bc3bcada35ae1e 1100w, https://mintcdn.com/langchain-5e9cc07a/dL5Sn6Cmy9pwtY0V/oss/images/static-interrupt.png?w=1650&fit=max&auto=format&n=dL5Sn6Cmy9pwtY0V&q=85&s=9f9a2c0f2631c0e69cd248f6319933fe 1650w, https://mintcdn.com/langchain-5e9cc07a/dL5Sn6Cmy9pwtY0V/oss/images/static-interrupt.png?w=2500&fit=max&auto=format&n=dL5Sn6Cmy9pwtY0V&q=85&s=5a46b765b436ab5d0dc2f41c01ffad80 2500w" />

***

<Callout icon="pen-to-square" iconType="regular">
  [Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/oss/langgraph/interrupts.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).
</Callout>

<Tip icon="terminal" iconType="regular">
  [Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.
</Tip>

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.langchain.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Use time-travel

When working with non-deterministic systems that make model-based decisions (e.g., agents powered by LLMs), it can be useful to examine their decision-making process in detail:

1. <Icon icon="lightbulb" size={16} /> **Understand reasoning**: Analyze the steps that led to a successful result.
2. <Icon icon="bug" size={16} /> **Debug mistakes**: Identify where and why errors occurred.
3. <Icon icon="magnifying-glass" size={16} /> **Explore alternatives**: Test different paths to uncover better solutions.

LangGraph provides time-travel functionality to support these use cases. Specifically, you can resume execution from a prior checkpoint — either replaying the same state or modifying it to explore alternatives. In all cases, resuming past execution produces a new fork in the history.

To use time-travel in LangGraph:

1. [Run the graph](#1-run-the-graph) with initial inputs using [`invoke`](https://reference.langchain.com/javascript/classes/_langchain_langgraph.index.CompiledStateGraph.html#invoke) or [`stream`](https://reference.langchain.com/javascript/classes/_langchain_langgraph.index.CompiledStateGraph.html#stream) methods.
2. [Identify a checkpoint in an existing thread](#2-identify-a-checkpoint): Use the [`getStateHistory`](https://reference.langchain.com/javascript/classes/_langchain_langgraph.pregel.Pregel.html#getStateHistory) method to retrieve the execution history for a specific `thread_id` and locate the desired `checkpoint_id`.
   Alternatively, set a [breakpoint](/oss/javascript/langgraph/interrupts) before the node(s) where you want execution to pause. You can then find the most recent checkpoint recorded up to that breakpoint.
3. [Update the graph state (optional)](#3-update-the-state-optional): Use the [`updateState`](https://reference.langchain.com/javascript/classes/_langchain_langgraph.pregel.Pregel.html#updateState) method to modify the graph's state at the checkpoint and resume execution from alternative state.
4. [Resume execution from the checkpoint](#4-resume-execution-from-the-checkpoint): Use the `invoke` or `stream` methods with an input of `null` and a configuration containing the appropriate `thread_id` and `checkpoint_id`.

## In a workflow

This example builds a simple LangGraph workflow that generates a joke topic and writes a joke using an LLM. It demonstrates how to run the graph, retrieve past execution checkpoints, optionally modify the state, and resume execution from a chosen checkpoint to explore alternate outcomes.

### Setup

To build this workflow in this example you need to set up the Anthropic LLM and install the required dependencies:

1. Install dependencies

<CodeGroup>
  ```bash npm theme={null}
  npm install @langchain/langgraph @langchain/core
  ```

  ```bash pnpm theme={null}
  pnpm add @langchain/langgraph @langchain/core
  ```

  ```bash yarn theme={null}
  yarn add @langchain/langgraph @langchain/core
  ```

  ```bash bun theme={null}
  bun add @langchain/langgraph @langchain/core
  ```
</CodeGroup>

2. Initialize the LLM:

```typescript  theme={null}
import { ChatAnthropic } from "@langchain/anthropic";

const llm = new ChatAnthropic({
  model: "claude-sonnet-4-5-20250929",
  apiKey: "<your_anthropic_key>"
});
```

<Tip>
  Sign up for [LangSmith](https://smith.langchain.com) to quickly spot issues and improve the performance of your LangGraph projects. LangSmith lets you use trace data to debug, test, and monitor your LLM apps built with LangGraph. You can also [fetch traces from LangSmith](/langsmith/export-traces#fetch-a-single-run-by-id) to replay and debug production issues locally.
</Tip>

3. Implement the workflow
   The implementation of the workflow is a simple graph with two nodes, one for generating a joke topic, another for writing the joke itself and a state to storing the intermediate values.

```typescript  theme={null}
import { v4 as uuidv4 } from "uuid";
import * as z from "zod";
import { StateGraph, StateSchema, GraphNode, START, END, MemorySaver } from "@langchain/langgraph";
import { ChatAnthropic } from "@langchain/anthropic";

const State = new StateSchema({
  topic: z.string().optional(),
  joke: z.string().optional(),
});

const model = new ChatAnthropic({
  model: "claude-sonnet-4-5-20250929",
  temperature: 0,
});

const generateTopic: GraphNode<typeof State> = async (state) => {
  // LLM call to generate a topic for the joke
  const msg = await model.invoke("Give me a funny topic for a joke");
  return { topic: msg.content };
};

const writeJoke: GraphNode<typeof State> = async (state) => {
  // LLM call to write a joke based on the topic
  const msg = await model.invoke(`Write a short joke about ${state.topic}`);
  return { joke: msg.content };
};

// Build workflow
const workflow = new StateGraph(State)
  // Add nodes
  .addNode("generateTopic", generateTopic)
  .addNode("writeJoke", writeJoke)
  // Add edges to connect nodes
  .addEdge(START, "generateTopic")
  .addEdge("generateTopic", "writeJoke")
  .addEdge("writeJoke", END);

// Compile
const checkpointer = new MemorySaver();
const graph = workflow.compile({ checkpointer });
```

### 1. Run the graph

To start the workflow, [`invoke`](https://reference.langchain.com/javascript/classes/_langchain_langgraph.index.CompiledStateGraph.html#invoke) is called without any inputs. Note the `thread_id` to track this execution and retrieve its checkpoints later.

```typescript  theme={null}
const config = {
  configurable: {
    thread_id: uuidv4(),
  },
};

const state = await graph.invoke({}, config);

console.log(state.topic);
console.log();
console.log(state.joke);
```

**Output:**

```
How about "The Secret Life of Socks in the Dryer"? You know, exploring the mysterious phenomenon of how socks go into the laundry as pairs but come out as singles. Where do they go? Are they starting new lives elsewhere? Is there a sock paradise we don't know about? There's a lot of comedic potential in the everyday mystery that unites us all!

# The Secret Life of Socks in the Dryer

I finally discovered where all my missing socks go after the dryer. Turns out they're not missing at all—they've just eloped with someone else's socks from the laundromat to start new lives together.

My blue argyle is now living in Bermuda with a red polka dot, posting vacation photos on Sockstagram and sending me lint as alimony.
```

### 2. Identify a checkpoint

To continue from a previous point in the graphs run, use [`get_state_history`](https://reference.langchain.com/javascript/classes/_langchain_langgraph.pregel.Pregel.html#getStateHistory) to retrieve all the states and select the one where you want to resume execution.

```typescript  theme={null}
// The states are returned in reverse chronological order.
const states = [];
for await (const state of graph.getStateHistory(config)) {
  states.push(state);
}

for (const state of states) {
  console.log(state.next);
  console.log(state.config.configurable?.checkpoint_id);
  console.log();
}
```

**Output:**

```
[]
1f02ac4a-ec9f-6524-8002-8f7b0bbeed0e

['writeJoke']
1f02ac4a-ce2a-6494-8001-cb2e2d651227

['generateTopic']
1f02ac4a-a4e0-630d-8000-b73c254ba748

['__start__']
1f02ac4a-a4dd-665e-bfff-e6c8c44315d9
```

```typescript  theme={null}
// This is the state before last (states are listed in chronological order)
const selectedState = states[1];
console.log(selectedState.next);
console.log(selectedState.values);
```

**Output:**

```
['writeJoke']
{'topic': 'How about "The Secret Life of Socks in the Dryer"? You know, exploring the mysterious phenomenon of how socks go into the laundry as pairs but come out as singles. Where do they go? Are they starting new lives elsewhere? Is there a sock paradise we don\\'t know about? There\\'s a lot of comedic potential in the everyday mystery that unites us all!'}
```

<a id="optional" />

### 3. Update the state (optional)

`updateState` will create a new checkpoint. The new checkpoint will be associated with the same thread, but a new checkpoint ID.

```typescript  theme={null}
const newConfig = await graph.updateState(selectedState.config, {
  topic: "chickens",
});
console.log(newConfig);
```

**Output:**

```
{'configurable': {'thread_id': 'c62e2e03-c27b-4cb6-8cea-ea9bfedae006', 'checkpoint_ns': '', 'checkpoint_id': '1f02ac4a-ecee-600b-8002-a1d21df32e4c'}}
```

### 4. Resume execution from the checkpoint

For resumings execution from the selected checkpoint, call [`invoke`](https://reference.langchain.com/javascript/classes/_langchain_langgraph.index.CompiledStateGraph.html#invoke) with the config that points to the new checkpoint.

```typescript  theme={null}
await graph.invoke(null, newConfig);
```

**Output:**

```typescript  theme={null}
{
  'topic': 'chickens',
  'joke': 'Why did the chicken join a band?\n\nBecause it had excellent drumsticks!'
}
```

***

<Callout icon="pen-to-square" iconType="regular">
  [Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/oss/langgraph/use-time-travel.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).
</Callout>

<Tip icon="terminal" iconType="regular">
  [Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.
</Tip>

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.langchain.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Memory

AI applications need [memory](/oss/javascript/concepts/memory) to share context across multiple interactions. In LangGraph, you can add two types of memory:

* [Add short-term memory](#add-short-term-memory) as a part of your agent's [state](/oss/javascript/langgraph/graph-api#state) to enable multi-turn conversations.
* [Add long-term memory](#add-long-term-memory) to store user-specific or application-level data across sessions.

## Add short-term memory

**Short-term** memory (thread-level [persistence](/oss/javascript/langgraph/persistence)) enables agents to track multi-turn conversations. To add short-term memory:

```typescript  theme={null}
import { MemorySaver, StateGraph } from "@langchain/langgraph";

const checkpointer = new MemorySaver();

const builder = new StateGraph(...);
const graph = builder.compile({ checkpointer });

await graph.invoke(
  { messages: [{ role: "user", content: "hi! i am Bob" }] },
  { configurable: { thread_id: "1" } }
);
```

### Use in production

In production, use a checkpointer backed by a database:

```typescript  theme={null}
import { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

const DB_URI = "postgresql://postgres:postgres@localhost:5442/postgres?sslmode=disable";
const checkpointer = PostgresSaver.fromConnString(DB_URI);

const builder = new StateGraph(...);
const graph = builder.compile({ checkpointer });
```

<Accordion title="Example: using Postgres checkpointer">
  ```
  npm install @langchain/langgraph-checkpoint-postgres
  ```

  <Tip>
    You need to call `checkpointer.setup()` the first time you're using Postgres checkpointer
  </Tip>

  ```typescript  theme={null}
  import { ChatAnthropic } from "@langchain/anthropic";
  import { StateGraph, StateSchema, MessagesValue, GraphNode, START } from "@langchain/langgraph";
  import { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

  const State = new StateSchema({
    messages: MessagesValue,
  });

  const model = new ChatAnthropic({ model: "claude-haiku-4-5-20251001" });

  const DB_URI = "postgresql://postgres:postgres@localhost:5442/postgres?sslmode=disable";
  const checkpointer = PostgresSaver.fromConnString(DB_URI);
  // await checkpointer.setup();

  const callModel: GraphNode<typeof State> = async (state) => {
    const response = await model.invoke(state.messages);
    return { messages: [response] };
  };

  const builder = new StateGraph(State)
    .addNode("call_model", callModel)
    .addEdge(START, "call_model");

  const graph = builder.compile({ checkpointer });

  const config = {
    configurable: {
      thread_id: "1"
    }
  };

  for await (const chunk of await graph.stream(
    { messages: [{ role: "user", content: "hi! I'm bob" }] },
    { ...config, streamMode: "values" }
  )) {
    console.log(chunk.messages.at(-1)?.content);
  }

  for await (const chunk of await graph.stream(
    { messages: [{ role: "user", content: "what's my name?" }] },
    { ...config, streamMode: "values" }
  )) {
    console.log(chunk.messages.at(-1)?.content);
  }
  ```
</Accordion>

### Use in subgraphs

If your graph contains [subgraphs](/oss/javascript/langgraph/use-subgraphs), you only need to provide the checkpointer when compiling the parent graph. LangGraph will automatically propagate the checkpointer to the child subgraphs.

```typescript  theme={null}
import { StateGraph, StateSchema, START, MemorySaver } from "@langchain/langgraph";
import { z } from "zod/v4";

const State = new StateSchema({ foo: z.string() });

const subgraphBuilder = new StateGraph(State)
  .addNode("subgraph_node_1", (state) => {
    return { foo: state.foo + "bar" };
  })
  .addEdge(START, "subgraph_node_1");
const subgraph = subgraphBuilder.compile();

const builder = new StateGraph(State)
  .addNode("node_1", subgraph)
  .addEdge(START, "node_1");

const checkpointer = new MemorySaver();
const graph = builder.compile({ checkpointer });
```

If you want the subgraph to have its own memory, you can compile it with the appropriate checkpointer option. This is useful in [multi-agent](/oss/javascript/langchain/multi-agent) systems, if you want agents to keep track of their internal message histories.

```typescript  theme={null}
const subgraphBuilder = new StateGraph(...);
const subgraph = subgraphBuilder.compile({ checkpointer: true });  // [!code highlight]
```

## Add long-term memory

Use long-term memory to store user-specific or application-specific data across conversations.

```typescript  theme={null}
import { InMemoryStore, StateGraph } from "@langchain/langgraph";

const store = new InMemoryStore();

const builder = new StateGraph(...);
const graph = builder.compile({ store });
```

### Use in production

In production, use a store backed by a database:

```typescript  theme={null}
import { PostgresStore } from "@langchain/langgraph-checkpoint-postgres/store";

const DB_URI = "postgresql://postgres:postgres@localhost:5442/postgres?sslmode=disable";
const store = PostgresStore.fromConnString(DB_URI);

const builder = new StateGraph(...);
const graph = builder.compile({ store });
```

<Accordion title="Example: using Postgres store">
  ```
  npm install @langchain/langgraph-checkpoint-postgres
  ```

  <Tip>
    You need to call `store.setup()` the first time you're using Postgres store
  </Tip>

  ```typescript  theme={null}
  import { ChatAnthropic } from "@langchain/anthropic";
  import { StateGraph, StateSchema, MessagesValue, GraphNode, START, LangGraphRunnableConfig } from "@langchain/langgraph";
  import { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";
  import { PostgresStore } from "@langchain/langgraph-checkpoint-postgres/store";
  import { v4 as uuidv4 } from "uuid";

  const State = new StateSchema({
    messages: MessagesValue,
  });

  const model = new ChatAnthropic({ model: "claude-haiku-4-5-20251001" });

  const DB_URI = "postgresql://postgres:postgres@localhost:5442/postgres?sslmode=disable";

  const store = PostgresStore.fromConnString(DB_URI);
  const checkpointer = PostgresSaver.fromConnString(DB_URI);
  // await store.setup();
  // await checkpointer.setup();

  const callModel: GraphNode<typeof State> = async (state, config) => {
    const userId = config.configurable?.userId;
    const namespace = ["memories", userId];
    const memories = await config.store?.search(namespace, { query: state.messages.at(-1)?.content });
    const info = memories?.map(d => d.value.data).join("\n") || "";
    const systemMsg = `You are a helpful assistant talking to the user. User info: ${info}`;

    // Store new memories if the user asks the model to remember
    const lastMessage = state.messages.at(-1);
    if (lastMessage?.content?.toLowerCase().includes("remember")) {
      const memory = "User name is Bob";
      await config.store?.put(namespace, uuidv4(), { data: memory });
    }

    const response = await model.invoke([
      { role: "system", content: systemMsg },
      ...state.messages
    ]);
    return { messages: [response] };
  };

  const builder = new StateGraph(State)
    .addNode("call_model", callModel)
    .addEdge(START, "call_model");

  const graph = builder.compile({
    checkpointer,
    store,
  });

  const config = {
    configurable: {
      thread_id: "1",
      userId: "1",
    }
  };

  for await (const chunk of await graph.stream(
    { messages: [{ role: "user", content: "Hi! Remember: my name is Bob" }] },
    { ...config, streamMode: "values" }
  )) {
    console.log(chunk.messages.at(-1)?.content);
  }

  const config2 = {
    configurable: {
      thread_id: "2",
      userId: "1",
    }
  };

  for await (const chunk of await graph.stream(
    { messages: [{ role: "user", content: "what is my name?" }] },
    { ...config2, streamMode: "values" }
  )) {
    console.log(chunk.messages.at(-1)?.content);
  }
  ```
</Accordion>

### Use semantic search

Enable semantic search in your graph's memory store to let graph agents search for items in the store by semantic similarity.

```typescript  theme={null}
import { OpenAIEmbeddings } from "@langchain/openai";
import { InMemoryStore } from "@langchain/langgraph";

// Create store with semantic search enabled
const embeddings = new OpenAIEmbeddings({ model: "text-embedding-3-small" });
const store = new InMemoryStore({
  index: {
    embeddings,
    dims: 1536,
  },
});

await store.put(["user_123", "memories"], "1", { text: "I love pizza" });
await store.put(["user_123", "memories"], "2", { text: "I am a plumber" });

const items = await store.search(["user_123", "memories"], {
  query: "I'm hungry",
  limit: 1,
});
```

<Accordion title="Long-term memory with semantic search">
  ```typescript  theme={null}
  import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
  import { StateGraph, StateSchema, MessagesValue, GraphNode, START, InMemoryStore } from "@langchain/langgraph";

  const State = new StateSchema({
    messages: MessagesValue,
  });

  const model = new ChatOpenAI({ model: "gpt-4o-mini" });

  // Create store with semantic search enabled
  const embeddings = new OpenAIEmbeddings({ model: "text-embedding-3-small" });
  const store = new InMemoryStore({
    index: {
      embeddings,
      dims: 1536,
    }
  });

  await store.put(["user_123", "memories"], "1", { text: "I love pizza" });
  await store.put(["user_123", "memories"], "2", { text: "I am a plumber" });

  const chat: GraphNode<typeof State> = async (state, config) => {
    // Search based on user's last message
    const items = await config.store.search(
      ["user_123", "memories"],
      { query: state.messages.at(-1)?.content, limit: 2 }
    );
    const memories = items.map(item => item.value.text).join("\n");
    const memoriesText = memories ? `## Memories of user\n${memories}` : "";

    const response = await model.invoke([
      { role: "system", content: `You are a helpful assistant.\n${memoriesText}` },
      ...state.messages,
    ]);

    return { messages: [response] };
  };

  const builder = new StateGraph(State)
    .addNode("chat", chat)
    .addEdge(START, "chat");
  const graph = builder.compile({ store });

  for await (const [message, metadata] of await graph.stream(
    { messages: [{ role: "user", content: "I'm hungry" }] },
    { streamMode: "messages" }
  )) {
    if (message.content) {
      console.log(message.content);
    }
  }
  ```
</Accordion>

## Manage short-term memory

With [short-term memory](#add-short-term-memory) enabled, long conversations can exceed the LLM's context window. Common solutions are:

* [Trim messages](#trim-messages): Remove first or last N messages (before calling LLM)
* [Delete messages](#delete-messages) from LangGraph state permanently
* [Summarize messages](#summarize-messages): Summarize earlier messages in the history and replace them with a summary
* [Manage checkpoints](#manage-checkpoints) to store and retrieve message history
* Custom strategies (e.g., message filtering, etc.)

This allows the agent to keep track of the conversation without exceeding the LLM's context window.

### Trim messages

Most LLMs have a maximum supported context window (denominated in tokens). One way to decide when to truncate messages is to count the tokens in the message history and truncate whenever it approaches that limit. If you're using LangChain, you can use the trim messages utility and specify the number of tokens to keep from the list, as well as the `strategy` (e.g., keep the last `maxTokens`) to use for handling the boundary.

To trim message history, use the [`trimMessages`](https://js.langchain.com/docs/how_to/trim_messages/) function:

```typescript  theme={null}
import { trimMessages } from "@langchain/core/messages";
import { StateSchema, MessagesValue, GraphNode } from "@langchain/langgraph";

const State = new StateSchema({
  messages: MessagesValue,
});

const callModel: GraphNode<typeof State> = async (state) => {
  const messages = trimMessages(state.messages, {
    strategy: "last",
    maxTokens: 128,
    startOn: "human",
    endOn: ["human", "tool"],
  });
  const response = await model.invoke(messages);
  return { messages: [response] };
};

const builder = new StateGraph(State)
  .addNode("call_model", callModel);
  // ...
```

<Accordion title="Full example: trim messages">
  ```typescript  theme={null}
  import { trimMessages } from "@langchain/core/messages";
  import { ChatAnthropic } from "@langchain/anthropic";
  import { StateGraph, StateSchema, MessagesValue, GraphNode, START, MemorySaver } from "@langchain/langgraph";

  const State = new StateSchema({
    messages: MessagesValue,
  });

  const model = new ChatAnthropic({ model: "claude-3-5-sonnet-20241022" });

  const callModel: GraphNode<typeof State> = async (state) => {
    const messages = trimMessages(state.messages, {
      strategy: "last",
      maxTokens: 128,
      startOn: "human",
      endOn: ["human", "tool"],
      tokenCounter: model,
    });
    const response = await model.invoke(messages);
    return { messages: [response] };
  };

  const checkpointer = new MemorySaver();
  const builder = new StateGraph(State)
    .addNode("call_model", callModel)
    .addEdge(START, "call_model");
  const graph = builder.compile({ checkpointer });

  const config = { configurable: { thread_id: "1" } };
  await graph.invoke({ messages: [{ role: "user", content: "hi, my name is bob" }] }, config);
  await graph.invoke({ messages: [{ role: "user", content: "write a short poem about cats" }] }, config);
  await graph.invoke({ messages: [{ role: "user", content: "now do the same but for dogs" }] }, config);
  const finalResponse = await graph.invoke({ messages: [{ role: "user", content: "what's my name?" }] }, config);

  console.log(finalResponse.messages.at(-1)?.content);
  ```

  ```
  Your name is Bob, as you mentioned when you first introduced yourself.
  ```
</Accordion>

### Delete messages

You can delete messages from the graph state to manage the message history. This is useful when you want to remove specific messages or clear the entire message history.

To delete messages from the graph state, you can use the `RemoveMessage`. For `RemoveMessage` to work, you need to use a state key with [`messagesStateReducer`](https://reference.langchain.com/javascript/functions/_langchain_langgraph.index.messagesStateReducer.html) [reducer](/oss/javascript/langgraph/graph-api#reducers), like `MessagesValue`.

To remove specific messages:

```typescript  theme={null}
import { RemoveMessage } from "@langchain/core/messages";

const deleteMessages = (state) => {
  const messages = state.messages;
  if (messages.length > 2) {
    // remove the earliest two messages
    return {
      messages: messages
        .slice(0, 2)
        .map((m) => new RemoveMessage({ id: m.id })),
    };
  }
};
```

<Warning>
  When deleting messages, **make sure** that the resulting message history is valid. Check the limitations of the LLM provider you're using. For example:

  * Some providers expect message history to start with a `user` message
  * Most providers require `assistant` messages with tool calls to be followed by corresponding `tool` result messages.
</Warning>

<Accordion title="Full example: delete messages">
  ```typescript  theme={null}
  import { RemoveMessage } from "@langchain/core/messages";
  import { ChatAnthropic } from "@langchain/anthropic";
  import { StateGraph, StateSchema, MessagesValue, GraphNode, START, MemorySaver } from "@langchain/langgraph";

  const State = new StateSchema({
    messages: MessagesValue,
  });

  const model = new ChatAnthropic({ model: "claude-3-5-sonnet-20241022" });

  const deleteMessages: GraphNode<typeof State> = (state) => {
    const messages = state.messages;
    if (messages.length > 2) {
      // remove the earliest two messages
      return { messages: messages.slice(0, 2).map(m => new RemoveMessage({ id: m.id })) };
    }
    return {};
  };

  const callModel: GraphNode<typeof State> = async (state) => {
    const response = await model.invoke(state.messages);
    return { messages: [response] };
  };

  const builder = new StateGraph(State)
    .addNode("call_model", callModel)
    .addNode("delete_messages", deleteMessages)
    .addEdge(START, "call_model")
    .addEdge("call_model", "delete_messages");

  const checkpointer = new MemorySaver();
  const app = builder.compile({ checkpointer });

  const config = { configurable: { thread_id: "1" } };

  for await (const event of await app.stream(
    { messages: [{ role: "user", content: "hi! I'm bob" }] },
    { ...config, streamMode: "values" }
  )) {
    console.log(event.messages.map(message => [message.getType(), message.content]));
  }

  for await (const event of await app.stream(
    { messages: [{ role: "user", content: "what's my name?" }] },
    { ...config, streamMode: "values" }
  )) {
    console.log(event.messages.map(message => [message.getType(), message.content]));
  }
  ```

  ```
  [['human', "hi! I'm bob"]]
  [['human', "hi! I'm bob"], ['ai', 'Hi Bob! How are you doing today? Is there anything I can help you with?']]
  [['human', "hi! I'm bob"], ['ai', 'Hi Bob! How are you doing today? Is there anything I can help you with?'], ['human', "what's my name?"]]
  [['human', "hi! I'm bob"], ['ai', 'Hi Bob! How are you doing today? Is there anything I can help you with?'], ['human', "what's my name?"], ['ai', 'Your name is Bob.']]
  [['human', "what's my name?"], ['ai', 'Your name is Bob.']]
  ```
</Accordion>

### Summarize messages

The problem with trimming or removing messages, as shown above, is that you may lose information from culling of the message queue. Because of this, some applications benefit from a more sophisticated approach of summarizing the message history using a chat model.

<img src="https://mintcdn.com/langchain-5e9cc07a/ybiAaBfoBvFquMDz/oss/images/summary.png?fit=max&auto=format&n=ybiAaBfoBvFquMDz&q=85&s=c8ed3facdccd4ef5c7e52902c72ba938" alt="Summary" data-og-width="609" width="609" data-og-height="242" height="242" data-path="oss/images/summary.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/langchain-5e9cc07a/ybiAaBfoBvFquMDz/oss/images/summary.png?w=280&fit=max&auto=format&n=ybiAaBfoBvFquMDz&q=85&s=4208b9b0cc9f459f3dc4e5219918471b 280w, https://mintcdn.com/langchain-5e9cc07a/ybiAaBfoBvFquMDz/oss/images/summary.png?w=560&fit=max&auto=format&n=ybiAaBfoBvFquMDz&q=85&s=7acb77c081545f57042368f4e9d0c8cb 560w, https://mintcdn.com/langchain-5e9cc07a/ybiAaBfoBvFquMDz/oss/images/summary.png?w=840&fit=max&auto=format&n=ybiAaBfoBvFquMDz&q=85&s=2fcfdb0c481d2e1d361e76db763a41e5 840w, https://mintcdn.com/langchain-5e9cc07a/ybiAaBfoBvFquMDz/oss/images/summary.png?w=1100&fit=max&auto=format&n=ybiAaBfoBvFquMDz&q=85&s=4abdac693a562788aa0db8681bef8ea7 1100w, https://mintcdn.com/langchain-5e9cc07a/ybiAaBfoBvFquMDz/oss/images/summary.png?w=1650&fit=max&auto=format&n=ybiAaBfoBvFquMDz&q=85&s=40acfefa91dcb11b247a6e4a7705f22b 1650w, https://mintcdn.com/langchain-5e9cc07a/ybiAaBfoBvFquMDz/oss/images/summary.png?w=2500&fit=max&auto=format&n=ybiAaBfoBvFquMDz&q=85&s=8d765aaf7551e8b0fc2720de7d2ac2a8 2500w" />

Prompting and orchestration logic can be used to summarize the message history. For example, in LangGraph you can include a `summary` key in the state alongside the `messages` key:

```typescript  theme={null}
import { StateSchema, MessagesValue, GraphNode } from "@langchain/langgraph";
import { z } from "zod/v4";

const State = new StateSchema({
  messages: MessagesValue,
  summary: z.string().optional(),
});
```

Then, you can generate a summary of the chat history, using any existing summary as context for the next summary. This `summarizeConversation` node can be called after some number of messages have accumulated in the `messages` state key.

```typescript  theme={null}
import { RemoveMessage, HumanMessage } from "@langchain/core/messages";

const summarizeConversation: GraphNode<typeof State> = async (state) => {
  // First, we get any existing summary
  const summary = state.summary || "";

  // Create our summarization prompt
  let summaryMessage: string;
  if (summary) {
    // A summary already exists
    summaryMessage =
      `This is a summary of the conversation to date: ${summary}\n\n` +
      "Extend the summary by taking into account the new messages above:";
  } else {
    summaryMessage = "Create a summary of the conversation above:";
  }

  // Add prompt to our history
  const messages = [
    ...state.messages,
    new HumanMessage({ content: summaryMessage })
  ];
  const response = await model.invoke(messages);

  // Delete all but the 2 most recent messages
  const deleteMessages = state.messages
    .slice(0, -2)
    .map(m => new RemoveMessage({ id: m.id }));

  return {
    summary: response.content,
    messages: deleteMessages
  };
};
```

<Accordion title="Full example: summarize messages">
  ```typescript  theme={null}
  import { ChatAnthropic } from "@langchain/anthropic";
  import {
    SystemMessage,
    HumanMessage,
    RemoveMessage,
  } from "@langchain/core/messages";
  import {
    StateGraph,
    StateSchema,
    MessagesValue,
    GraphNode,
    ConditionalEdgeRouter,
    START,
    END,
    MemorySaver,
  } from "@langchain/langgraph";
  import * as z from "zod";
  import { v4 as uuidv4 } from "uuid";

  const memory = new MemorySaver();

  // We will add a `summary` attribute (in addition to `messages` key)
  const GraphState = new StateSchema({
    messages: MessagesValue,
    summary: z.string().default(""),
  });

  // We will use this model for both the conversation and the summarization
  const model = new ChatAnthropic({ model: "claude-haiku-4-5-20251001" });

  // Define the logic to call the model
  const callModel: GraphNode<typeof GraphState> = async (state) => {
    // If a summary exists, we add this in as a system message
    const { summary } = state;
    let { messages } = state;
    if (summary) {
      const systemMessage = new SystemMessage({
        id: uuidv4(),
        content: `Summary of conversation earlier: ${summary}`,
      });
      messages = [systemMessage, ...messages];
    }
    const response = await model.invoke(messages);
    // We return an object, because this will get added to the existing state
    return { messages: [response] };
  };

  // We now define the logic for determining whether to end or summarize the conversation
  const shouldContinue: ConditionalEdgeRouter<typeof GraphState, "summarize_conversation"> = (state) => {
    const messages = state.messages;
    // If there are more than six messages, then we summarize the conversation
    if (messages.length > 6) {
      return "summarize_conversation";
    }
    // Otherwise we can just end
    return END;
  };

  const summarizeConversation: GraphNode<typeof GraphState> = async (state) => {
    // First, we summarize the conversation
    const { summary, messages } = state;
    let summaryMessage: string;
    if (summary) {
      // If a summary already exists, we use a different system prompt
      // to summarize it than if one didn't
      summaryMessage =
        `This is summary of the conversation to date: ${summary}\n\n` +
        "Extend the summary by taking into account the new messages above:";
    } else {
      summaryMessage = "Create a summary of the conversation above:";
    }

    const allMessages = [
      ...messages,
      new HumanMessage({ id: uuidv4(), content: summaryMessage }),
    ];

    const response = await model.invoke(allMessages);

    // We now need to delete messages that we no longer want to show up
    // I will delete all but the last two messages, but you can change this
    const deleteMessages = messages
      .slice(0, -2)
      .map((m) => new RemoveMessage({ id: m.id! }));

    if (typeof response.content !== "string") {
      throw new Error("Expected a string response from the model");
    }

    return { summary: response.content, messages: deleteMessages };
  };

  // Define a new graph
  const workflow = new StateGraph(GraphState)
    // Define the conversation node and the summarize node
    .addNode("conversation", callModel)
    .addNode("summarize_conversation", summarizeConversation)
    // Set the entrypoint as conversation
    .addEdge(START, "conversation")
    // We now add a conditional edge
    .addConditionalEdges(
      // First, we define the start node. We use `conversation`.
      // This means these are the edges taken after the `conversation` node is called.
      "conversation",
      // Next, we pass in the function that will determine which node is called next.
      shouldContinue,
    )
    // We now add a normal edge from `summarize_conversation` to END.
    // This means that after `summarize_conversation` is called, we end.
    .addEdge("summarize_conversation", END);

  // Finally, we compile it!
  const app = workflow.compile({ checkpointer: memory });
  ```
</Accordion>

### Manage checkpoints

You can view and delete the information stored by the checkpointer.

<a id="checkpoint" />

#### View thread state

```typescript  theme={null}
const config = {
  configurable: {
    thread_id: "1",
    // optionally provide an ID for a specific checkpoint,
    // otherwise the latest checkpoint is shown
    // checkpoint_id: "1f029ca3-1f5b-6704-8004-820c16b69a5a"
  },
};
await graph.getState(config);
```

```
{
  values: { messages: [HumanMessage(...), AIMessage(...), HumanMessage(...), AIMessage(...)] },
  next: [],
  config: { configurable: { thread_id: '1', checkpoint_ns: '', checkpoint_id: '1f029ca3-1f5b-6704-8004-820c16b69a5a' } },
  metadata: {
    source: 'loop',
    writes: { call_model: { messages: AIMessage(...) } },
    step: 4,
    parents: {},
    thread_id: '1'
  },
  createdAt: '2025-05-05T16:01:24.680462+00:00',
  parentConfig: { configurable: { thread_id: '1', checkpoint_ns: '', checkpoint_id: '1f029ca3-1790-6b0a-8003-baf965b6a38f' } },
  tasks: [],
  interrupts: []
}
```

<a id="checkpoints" />

#### View the history of the thread

```typescript  theme={null}
const config = {
  configurable: {
    thread_id: "1",
  },
};

const history = [];
for await (const state of graph.getStateHistory(config)) {
  history.push(state);
}
```

#### Delete all checkpoints for a thread

```typescript  theme={null}
const threadId = "1";
await checkpointer.deleteThread(threadId);
```

## Database management

If you are using any database-backed persistence implementation (such as Postgres or Redis) to store short and/or long-term memory, you will need to run migrations to set up the required schema before you can use it with your database.

By convention, most database-specific libraries define a `setup()` method on the checkpointer or store instance that runs the required migrations. However, you should check with your specific implementation of [`BaseCheckpointSaver`](https://reference.langchain.com/javascript/classes/_langchain_langgraph-checkpoint.BaseCheckpointSaver.html) or [`BaseStore`](https://reference.langchain.com/javascript/classes/_langchain_langgraph-checkpoint.BaseStore.html) to confirm the exact method name and usage.

We recommend running migrations as a dedicated deployment step, or you can ensure they're run as part of server startup.

***

<Callout icon="pen-to-square" iconType="regular">
  [Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/oss/langgraph/add-memory.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).
</Callout>

<Tip icon="terminal" iconType="regular">
  [Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.
</Tip>

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.langchain.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Subgraphs

This guide explains the mechanics of using subgraphs. A subgraph is a [graph](/oss/javascript/langgraph/graph-api#graphs) that is used as a [node](/oss/javascript/langgraph/graph-api#nodes) in another graph.

Subgraphs are useful for:

* Building [multi-agent systems](/oss/javascript/langchain/multi-agent)
* Re-using a set of nodes in multiple graphs
* Distributing development: when you want different teams to work on different parts of the graph independently, you can define each part as a subgraph, and as long as the subgraph interface (the input and output schemas) is respected, the parent graph can be built without knowing any details of the subgraph

When adding subgraphs, you need to define how the parent graph and the subgraph communicate:

* [Invoke a graph from a node](#invoke-a-graph-from-a-node) — subgraphs are called from inside a node in the parent graph
* [Add a graph as a node](#add-a-graph-as-a-node) — a subgraph is added directly as a node in the parent and **shares [state keys](/oss/javascript/langgraph/graph-api#state)** with the parent

## Setup

```bash  theme={null}
npm install @langchain/langgraph
```

<Tip>
  **Set up LangSmith for LangGraph development**
  Sign up for [LangSmith](https://smith.langchain.com) to quickly spot issues and improve the performance of your LangGraph projects. LangSmith lets you use trace data to debug, test, and monitor your LLM apps built with LangGraph — read more about how to get started [here](https://docs.smith.langchain.com).
</Tip>

## Invoke a graph from a node

A simple way to implement a subgraph is to invoke a graph from inside the node of another graph. In this case subgraphs can have **completely different schemas** from the parent graph (no shared keys). For example, you might want to keep a private message history for each of the agents in a [multi-agent](/oss/javascript/langchain/multi-agent) system.

If that's the case for your application, you need to define a node **function that invokes the subgraph**. This function needs to transform the input (parent) state to the subgraph state before invoking the subgraph, and transform the results back to the parent state before returning the state update from the node.

```typescript  theme={null}
import { StateGraph, StateSchema, START } from "@langchain/langgraph";
import * as z from "zod";

const SubgraphState = new StateSchema({
  bar: z.string(),
});

// Subgraph
const subgraphBuilder = new StateGraph(SubgraphState)
  .addNode("subgraphNode1", (state) => {
    return { bar: "hi! " + state.bar };
  })
  .addEdge(START, "subgraphNode1");

const subgraph = subgraphBuilder.compile();

// Parent graph
const State = new StateSchema({
  foo: z.string(),
});

// Transform the state to the subgraph state and back
const builder = new StateGraph(State)
  .addNode("node1", async (state) => {
    const subgraphOutput = await subgraph.invoke({ bar: state.foo });
    return { foo: subgraphOutput.bar };
  })
  .addEdge(START, "node1");

const graph = builder.compile();
```

<Accordion title="Full example: different state schemas">
  ```typescript  theme={null}
  import { StateGraph, StateSchema, START } from "@langchain/langgraph";
  import * as z from "zod";

  // Define subgraph
  const SubgraphState = new StateSchema({
    // note that none of these keys are shared with the parent graph state
    bar: z.string(),
    baz: z.string(),
  });

  const subgraphBuilder = new StateGraph(SubgraphState)
    .addNode("subgraphNode1", (state) => {
      return { baz: "baz" };
    })
    .addNode("subgraphNode2", (state) => {
      return { bar: state.bar + state.baz };
    })
    .addEdge(START, "subgraphNode1")
    .addEdge("subgraphNode1", "subgraphNode2");

  const subgraph = subgraphBuilder.compile();

  // Define parent graph
  const ParentState = new StateSchema({
    foo: z.string(),
  });

  const builder = new StateGraph(ParentState)
    .addNode("node1", (state) => {
      return { foo: "hi! " + state.foo };
    })
    .addNode("node2", async (state) => {
      const response = await subgraph.invoke({ bar: state.foo });   // [!code highlight]
      return { foo: response.bar };   // [!code highlight]
    })
    .addEdge(START, "node1")
    .addEdge("node1", "node2");

  const graph = builder.compile();

  for await (const chunk of await graph.stream(
    { foo: "foo" },
    { subgraphs: true }
  )) {
    console.log(chunk);
  }
  ```

  1. Transform the state to the subgraph state
  2. Transform response back to the parent state

  ```
  [[], { node1: { foo: 'hi! foo' } }]
  [['node2:9c36dd0f-151a-cb42-cbad-fa2f851f9ab7'], { subgraphNode1: { baz: 'baz' } }]
  [['node2:9c36dd0f-151a-cb42-cbad-fa2f851f9ab7'], { subgraphNode2: { bar: 'hi! foobaz' } }]
  [[], { node2: { foo: 'hi! foobaz' } }]
  ```
</Accordion>

<Accordion title="Full example: different state schemas (two levels of subgraphs)">
  This is an example with two levels of subgraphs: parent -> child -> grandchild.

  ```typescript  theme={null}
  import { StateGraph, StateSchema, START, END } from "@langchain/langgraph";
  import * as z from "zod";

  // Grandchild graph
  const GrandChildState = new StateSchema({
    myGrandchildKey: z.string(),
  });

  const grandchild = new StateGraph(GrandChildState)
    .addNode("grandchild1", (state) => {
      // NOTE: child or parent keys will not be accessible here
      return { myGrandchildKey: state.myGrandchildKey + ", how are you" };
    })
    .addEdge(START, "grandchild1")
    .addEdge("grandchild1", END);

  const grandchildGraph = grandchild.compile();

  // Child graph
  const ChildState = new StateSchema({
    myChildKey: z.string(),
  });

  const child = new StateGraph(ChildState)
    .addNode("child1", async (state) => {
      // NOTE: parent or grandchild keys won't be accessible here
      const grandchildGraphInput = { myGrandchildKey: state.myChildKey };   // [!code highlight]
      const grandchildGraphOutput = await grandchildGraph.invoke(grandchildGraphInput);
      return { myChildKey: grandchildGraphOutput.myGrandchildKey + " today?" };   // [!code highlight]
    })   // [!code highlight]
    .addEdge(START, "child1")
    .addEdge("child1", END);

  const childGraph = child.compile();

  // Parent graph
  const ParentState = new StateSchema({
    myKey: z.string(),
  });

  const parent = new StateGraph(ParentState)
    .addNode("parent1", (state) => {
      // NOTE: child or grandchild keys won't be accessible here
      return { myKey: "hi " + state.myKey };
    })
    .addNode("child", async (state) => {
      const childGraphInput = { myChildKey: state.myKey };   // [!code highlight]
      const childGraphOutput = await childGraph.invoke(childGraphInput);
      return { myKey: childGraphOutput.myChildKey };   // [!code highlight]
    })   // [!code highlight]
    .addNode("parent2", (state) => {
      return { myKey: state.myKey + " bye!" };
    })
    .addEdge(START, "parent1")
    .addEdge("parent1", "child")
    .addEdge("child", "parent2")
    .addEdge("parent2", END);

  const parentGraph = parent.compile();

  for await (const chunk of await parentGraph.stream(
    { myKey: "Bob" },
    { subgraphs: true }
  )) {
    console.log(chunk);
  }
  ```

  1. We're transforming the state from the child state channels (`myChildKey`) to the grandchild state channels (`myGrandchildKey`)
  2. We're transforming the state from the grandchild state channels (`myGrandchildKey`) back to the child state channels (`myChildKey`)
  3. We're passing a function here instead of just compiled graph (`grandchildGraph`)
  4. We're transforming the state from the parent state channels (`myKey`) to the child state channels (`myChildKey`)
  5. We're transforming the state from the child state channels (`myChildKey`) back to the parent state channels (`myKey`)
  6. We're passing a function here instead of just a compiled graph (`childGraph`)

  ```
  [[], { parent1: { myKey: 'hi Bob' } }]
  [['child:2e26e9ce-602f-862c-aa66-1ea5a4655e3b', 'child1:781bb3b1-3971-84ce-810b-acf819a03f9c'], { grandchild1: { myGrandchildKey: 'hi Bob, how are you' } }]
  [['child:2e26e9ce-602f-862c-aa66-1ea5a4655e3b'], { child1: { myChildKey: 'hi Bob, how are you today?' } }]
  [[], { child: { myKey: 'hi Bob, how are you today?' } }]
  [[], { parent2: { myKey: 'hi Bob, how are you today? bye!' } }]
  ```
</Accordion>

## Add a graph as a node

When the parent graph and subgraph can communicate over a shared state key (channel) in the [schema](/oss/javascript/langgraph/graph-api#state), you can add a graph as a [node](/oss/javascript/langgraph/graph-api#nodes) in another graph. For example, in [multi-agent](/oss/javascript/langchain/multi-agent) systems, the agents often communicate over a shared [messages](/oss/javascript/langgraph/graph-api#why-use-messages) key.

<img src="https://mintcdn.com/langchain-5e9cc07a/ybiAaBfoBvFquMDz/oss/images/subgraph.png?fit=max&auto=format&n=ybiAaBfoBvFquMDz&q=85&s=c280df5c968cd4237b0b5d03823d8946" alt="SQL agent graph" style={{ height: "450px" }} data-og-width="1177" width="1177" data-og-height="818" height="818" data-path="oss/images/subgraph.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/langchain-5e9cc07a/ybiAaBfoBvFquMDz/oss/images/subgraph.png?w=280&fit=max&auto=format&n=ybiAaBfoBvFquMDz&q=85&s=e3d08dae8fb81e15b4d8069a48999eac 280w, https://mintcdn.com/langchain-5e9cc07a/ybiAaBfoBvFquMDz/oss/images/subgraph.png?w=560&fit=max&auto=format&n=ybiAaBfoBvFquMDz&q=85&s=8d8942031ba051119e0cb772ef697e0b 560w, https://mintcdn.com/langchain-5e9cc07a/ybiAaBfoBvFquMDz/oss/images/subgraph.png?w=840&fit=max&auto=format&n=ybiAaBfoBvFquMDz&q=85&s=0d5285bd104c542fe660bc09fed53e5e 840w, https://mintcdn.com/langchain-5e9cc07a/ybiAaBfoBvFquMDz/oss/images/subgraph.png?w=1100&fit=max&auto=format&n=ybiAaBfoBvFquMDz&q=85&s=32bc8ffa0eda13a0f3bb163631774a60 1100w, https://mintcdn.com/langchain-5e9cc07a/ybiAaBfoBvFquMDz/oss/images/subgraph.png?w=1650&fit=max&auto=format&n=ybiAaBfoBvFquMDz&q=85&s=6a511f3b9dc44383614803d32390875a 1650w, https://mintcdn.com/langchain-5e9cc07a/ybiAaBfoBvFquMDz/oss/images/subgraph.png?w=2500&fit=max&auto=format&n=ybiAaBfoBvFquMDz&q=85&s=169d55e154e5ea0146a57373235f768e 2500w" />

If your subgraph shares state keys with the parent graph, you can follow these steps to add it to your graph:

1. Define the subgraph workflow (`subgraphBuilder` in the example below) and compile it
2. Pass compiled subgraph to the `.addNode` method when defining the parent graph workflow

```typescript  theme={null}
import { StateGraph, StateSchema, START } from "@langchain/langgraph";
import * as z from "zod";

const State = new StateSchema({
  foo: z.string(),
});

// Subgraph
const subgraphBuilder = new StateGraph(State)
  .addNode("subgraphNode1", (state) => {
    return { foo: "hi! " + state.foo };
  })
  .addEdge(START, "subgraphNode1");

const subgraph = subgraphBuilder.compile();

// Parent graph
const builder = new StateGraph(State)
  .addNode("node1", subgraph)
  .addEdge(START, "node1");

const graph = builder.compile();
```

<Accordion title="Full example: shared state schemas">
  ```typescript  theme={null}
  import { StateGraph, StateSchema, START } from "@langchain/langgraph";
  import * as z from "zod";

  // Define subgraph
  const SubgraphState = new StateSchema({
    foo: z.string(),    // [!code highlight]
    bar: z.string(),    // [!code highlight]
  });

  const subgraphBuilder = new StateGraph(SubgraphState)
    .addNode("subgraphNode1", (state) => {
      return { bar: "bar" };
    })
    .addNode("subgraphNode2", (state) => {
      // note that this node is using a state key ('bar') that is only available in the subgraph
      // and is sending update on the shared state key ('foo')
      return { foo: state.foo + state.bar };
    })
    .addEdge(START, "subgraphNode1")
    .addEdge("subgraphNode1", "subgraphNode2");

  const subgraph = subgraphBuilder.compile();

  // Define parent graph
  const ParentState = new StateSchema({
    foo: z.string(),
  });

  const builder = new StateGraph(ParentState)
    .addNode("node1", (state) => {
      return { foo: "hi! " + state.foo };
    })
    .addNode("node2", subgraph)
    .addEdge(START, "node1")
    .addEdge("node1", "node2");

  const graph = builder.compile();

  for await (const chunk of await graph.stream({ foo: "foo" })) {
    console.log(chunk);
  }
  ```

  1. This key is shared with the parent graph state
  2. This key is private to the `SubgraphState` and is not visible to the parent graph

  ```
  { node1: { foo: 'hi! foo' } }
  { node2: { foo: 'hi! foobar' } }
  ```
</Accordion>

## Add persistence

You only need to **provide the checkpointer when compiling the parent graph**. LangGraph will automatically propagate the checkpointer to the child subgraphs.

```typescript  theme={null}
import { StateGraph, StateSchema, START, MemorySaver } from "@langchain/langgraph";
import * as z from "zod";

const State = new StateSchema({
  foo: z.string(),
});

// Subgraph
const subgraphBuilder = new StateGraph(State)
  .addNode("subgraphNode1", (state) => {
    return { foo: state.foo + "bar" };
  })
  .addEdge(START, "subgraphNode1");

const subgraph = subgraphBuilder.compile();

// Parent graph
const builder = new StateGraph(State)
  .addNode("node1", subgraph)
  .addEdge(START, "node1");

const checkpointer = new MemorySaver();
const graph = builder.compile({ checkpointer });
```

If you want the subgraph to **have its own memory**, you can compile it with the appropriate checkpointer option. This is useful in [multi-agent](/oss/javascript/langchain/multi-agent) systems, if you want agents to keep track of their internal message histories:

```typescript  theme={null}
const subgraphBuilder = new StateGraph(...)
const subgraph = subgraphBuilder.compile({ checkpointer: true });
```

## View subgraph state

When you enable [persistence](/oss/javascript/langgraph/persistence), you can [inspect the graph state](/oss/javascript/langgraph/persistence#checkpoints) (checkpoint) via the appropriate method. To view the subgraph state, you can use the subgraphs option.

You can inspect the graph state via `graph.getState(config)`. To view the subgraph state, you can use `graph.getState(config, { subgraphs: true })`.

<Warning>
  **Available **only** when interrupted**
  Subgraph state can only be viewed **when the subgraph is interrupted**. Once you resume the graph, you won't be able to access the subgraph state.
</Warning>

<Accordion title="View interrupted subgraph state">
  ```typescript  theme={null}
  import { StateGraph, StateSchema, START, MemorySaver, interrupt, Command } from "@langchain/langgraph";
  import * as z from "zod";

  const State = new StateSchema({
    foo: z.string(),
  });

  // Subgraph
  const subgraphBuilder = new StateGraph(State)
    .addNode("subgraphNode1", (state) => {
      const value = interrupt("Provide value:");
      return { foo: state.foo + value };
    })
    .addEdge(START, "subgraphNode1");

  const subgraph = subgraphBuilder.compile();

  // Parent graph
  const builder = new StateGraph(State)
    .addNode("node1", subgraph)
    .addEdge(START, "node1");

  const checkpointer = new MemorySaver();
  const graph = builder.compile({ checkpointer });

  const config = { configurable: { thread_id: "1" } };

  await graph.invoke({ foo: "" }, config);
  const parentState = await graph.getState(config);
  const subgraphState = (await graph.getState(config, { subgraphs: true })).tasks[0].state;   // [!code highlight]

  // resume the subgraph
  await graph.invoke(new Command({ resume: "bar" }), config);
  ```
</Accordion>

## Stream subgraph outputs

To include outputs from subgraphs in the streamed outputs, you can set the subgraphs option in the stream method of the parent graph. This will stream outputs from both the parent graph and any subgraphs.

```typescript  theme={null}
for await (const chunk of await graph.stream(
  { foo: "foo" },
  {
    subgraphs: true,   // [!code highlight]
    streamMode: "updates",
  }
)) {
  console.log(chunk);
}
```

1. Set `subgraphs: true` to stream outputs from subgraphs.

<Accordion title="Stream from subgraphs">
  ```typescript  theme={null}
  import { StateGraph, StateSchema, START } from "@langchain/langgraph";
  import * as z from "zod";

  // Define subgraph
  const SubgraphState = new StateSchema({
    foo: z.string(),
    bar: z.string(),
  });

  const subgraphBuilder = new StateGraph(SubgraphState)
    .addNode("subgraphNode1", (state) => {
      return { bar: "bar" };
    })
    .addNode("subgraphNode2", (state) => {
      // note that this node is using a state key ('bar') that is only available in the subgraph
      // and is sending update on the shared state key ('foo')
      return { foo: state.foo + state.bar };
    })
    .addEdge(START, "subgraphNode1")
    .addEdge("subgraphNode1", "subgraphNode2");

  const subgraph = subgraphBuilder.compile();

  // Define parent graph
  const ParentState = new StateSchema({
    foo: z.string(),
  });

  const builder = new StateGraph(ParentState)
    .addNode("node1", (state) => {
      return { foo: "hi! " + state.foo };
    })
    .addNode("node2", subgraph)
    .addEdge(START, "node1")
    .addEdge("node1", "node2");

  const graph = builder.compile();

  for await (const chunk of await graph.stream(
    { foo: "foo" },
    {
      streamMode: "updates",
      subgraphs: true,   // [!code highlight]
    }
  )) {
    console.log(chunk);
  }
  ```

  1. Set `subgraphs: true` to stream outputs from subgraphs.

  ```
  [[], { node1: { foo: 'hi! foo' } }]
  [['node2:e58e5673-a661-ebb0-70d4-e298a7fc28b7'], { subgraphNode1: { bar: 'bar' } }]
  [['node2:e58e5673-a661-ebb0-70d4-e298a7fc28b7'], { subgraphNode2: { foo: 'hi! foobar' } }]
  [[], { node2: { foo: 'hi! foobar' } }]
  ```
</Accordion>

***

<Callout icon="pen-to-square" iconType="regular">
  [Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/oss/langgraph/use-subgraphs.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).
</Callout>

<Tip icon="terminal" iconType="regular">
  [Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.
</Tip>

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.langchain.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Application structure

A LangGraph application consists of one or more graphs, a configuration file (`langgraph.json`), a file that specifies dependencies, and an optional `.env` file that specifies environment variables.

This guide shows a typical structure of an application and shows you how to provide the required configuration to deploy an application with [LangSmith Deployment](/langsmith/deployments).

<Info>
  LangSmith Deployment is a managed hosting platform for deploying and scaling LangGraph agents. It handles the infrastructure, scaling, and operational concerns so you can deploy your stateful, long-running agents directly from your repository. Learn more in the [Deployment documentation](/langsmith/deployments).
</Info>

## Key concepts

To deploy using the LangSmith, the following information should be provided:

1. A [LangGraph configuration file](#configuration-file-concepts) (`langgraph.json`) that specifies the dependencies, graphs, and environment variables to use for the application.
2. The [graphs](#graphs) that implement the logic of the application.
3. A file that specifies [dependencies](#dependencies) required to run the application.
4. [Environment variables](#environment-variables) that are required for the application to run.

## File structure

Below are examples of directory structures for applications:

```plaintext  theme={null}
my-app/
├── src # all project code lies within here
│   ├── utils # optional utilities for your graph
│   │   ├── tools.ts # tools for your graph
│   │   ├── nodes.ts # node functions for your graph
│   │   └── state.ts # state definition of your graph
│   └── agent.ts # code for constructing your graph
├── package.json # package dependencies
├── .env # environment variables
└── langgraph.json # configuration file for LangGraph
```

<Note>
  The directory structure of a LangGraph application can vary depending on the programming language and the package manager used.
</Note>

<a id="configuration-file-concepts" />

## Configuration file

The `langgraph.json` file is a JSON file that specifies the dependencies, graphs, environment variables, and other settings required to deploy a LangGraph application.

See the [LangGraph configuration file reference](/langsmith/cli#configuration-file) for details on all supported keys in the JSON file.

<Tip>
  The [LangGraph CLI](/langsmith/cli) defaults to using the configuration file `langgraph.json` in the current directory.
</Tip>

### Examples

* The dependencies will be loaded from a dependency file in the local directory (e.g., `package.json`).
* A single graph will be loaded from the file `./your_package/your_file.js` with the function `agent`.
* The environment variable `OPENAI_API_KEY` is set inline.

```json  theme={null}
{
  "dependencies": ["."],
  "graphs": {
    "my_agent": "./your_package/your_file.js:agent"
  },
  "env": {
    "OPENAI_API_KEY": "secret-key"
  }
}
```

## Dependencies

A LangGraph application may depend on other TypeScript/JavaScript libraries.

You will generally need to specify the following information for dependencies to be set up correctly:

1. A file in the directory that specifies the dependencies (e.g. `package.json`).

2. A `dependencies` key in the [LangGraph configuration file](#configuration-file-concepts) that specifies the dependencies required to run the LangGraph application.

3. Any additional binaries or system libraries can be specified using `dockerfile_lines` key in the [LangGraph configuration file](#configuration-file-concepts).

## Graphs

Use the `graphs` key in the [LangGraph configuration file](#configuration-file-concepts) to specify which graphs will be available in the deployed LangGraph application.

You can specify one or more graphs in the configuration file. Each graph is identified by a name (which should be unique) and a path for either: (1) the compiled graph or (2) a function that makes a graph is defined.

## Environment variables

If you're working with a deployed LangGraph application locally, you can configure environment variables in the `env` key of the [LangGraph configuration file](#configuration-file-concepts).

For a production deployment, you will typically want to configure the environment variables in the deployment environment.

***

<Callout icon="pen-to-square" iconType="regular">
  [Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/oss/langgraph/application-structure.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).
</Callout>

<Tip icon="terminal" iconType="regular">
  [Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.
</Tip>

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.langchain.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Test

After you've prototyped your LangGraph agent, a natural next step is to add tests. This guide covers some useful patterns you can use when writing unit tests.

Note that this guide is LangGraph-specific and covers scenarios around graphs with custom structures - if you are just getting started, check out [this section](/oss/javascript/langchain/test/) that uses LangChain's built-in [`createAgent`](https://reference.langchain.com/javascript/functions/langchain.index.createAgent.html) instead.

## Prerequisites

First, make sure you have [`vitest`](https://vitest.dev/) installed:

```bash  theme={null}
$ npm install -D vitest
```

## Getting started

Because many LangGraph agents depend on state, a useful pattern is to create your graph before each test where you use it, then compile it within tests with a new checkpointer instance.

The below example shows how this works with a simple, linear graph that progresses through `node1` and `node2`. Each node updates the single state key `my_key`:

```ts  theme={null}
import { test, expect } from 'vitest';
import {
  StateGraph,
  StateSchema,
  START,
  END,
  MemorySaver,
} from '@langchain/langgraph';
import * as z from "zod";

const State = new StateSchema({
  my_key: z.string(),
});

const createGraph = () => {
  return new StateGraph(State)
    .addNode('node1', (state) => ({ my_key: 'hello from node1' }))
    .addNode('node2', (state) => ({ my_key: 'hello from node2' }))
    .addEdge(START, 'node1')
    .addEdge('node1', 'node2')
    .addEdge('node2', END);
};

test('basic agent execution', async () => {
  const uncompiledGraph = createGraph();
  const checkpointer = new MemorySaver();
  const compiledGraph = uncompiledGraph.compile({ checkpointer });
  const result = await compiledGraph.invoke(
    { my_key: 'initial_value' },
    { configurable: { thread_id: '1' } }
  );
  expect(result.my_key).toBe('hello from node2');
});
```

## Testing individual nodes and edges

Compiled LangGraph agents expose references to each individual node as `graph.nodes`. You can take advantage of this to test individual nodes within your agent. Note that this will bypass any checkpointers passed when compiling the graph:

```ts  theme={null}
import { test, expect } from 'vitest';
import {
  StateGraph,
  START,
  END,
  MemorySaver,
  StateSchema,
} from '@langchain/langgraph';
import * as z from "zod";

const State = new StateSchema({
  my_key: z.string(),
});

const createGraph = () => {
  return new StateGraph(State)
    .addNode('node1', (state) => ({ my_key: 'hello from node1' }))
    .addNode('node2', (state) => ({ my_key: 'hello from node2' }))
    .addEdge(START, 'node1')
    .addEdge('node1', 'node2')
    .addEdge('node2', END);
};

test('individual node execution', async () => {
  const uncompiledGraph = createGraph();
  // Will be ignored in this example
  const checkpointer = new MemorySaver();
  const compiledGraph = uncompiledGraph.compile({ checkpointer });
  // Only invoke node 1
  const result = await compiledGraph.nodes['node1'].invoke(
    { my_key: 'initial_value' },
  );
  expect(result.my_key).toBe('hello from node1');
});
```

## Partial execution

For agents made up of larger graphs, you may wish to test partial execution paths within your agent rather than the entire flow end-to-end. In some cases, it may make semantic sense to [restructure these sections as subgraphs](/oss/javascript/langgraph/use-subgraphs), which you can invoke in isolation as normal.

However, if you do not wish to make changes to your agent graph's overall structure, you can use LangGraph's persistence mechanisms to simulate a state where your agent is paused right before the beginning of the desired section, and will pause again at the end of the desired section. The steps are as follows:

1. Compile your agent with a checkpointer (the in-memory checkpointer [`MemorySaver`](https://reference.langchain.com/javascript/classes/_langchain_langgraph-checkpoint.MemorySaver.html) will suffice for testing).
2. Call your agent's [`update_state`](/oss/javascript/langgraph/use-time-travel) method with an [`asNode`](/oss/javascript/langgraph/persistence#as-node) parameter set to the name of the node *before* the one you want to start your test.
3. Invoke your agent with the same `thread_id` you used to update the state and an `interruptBefore` parameter set to the name of the node you want to stop at.

Here's an example that executes only the second and third nodes in a linear graph:

```ts  theme={null}
import { test, expect } from 'vitest';
import {
  StateGraph,
  StateSchema,
  START,
  END,
  MemorySaver,
} from '@langchain/langgraph';
import * as z from "zod";

const State = new StateSchema({
  my_key: z.string(),
});

const createGraph = () => {
  return new StateGraph(State)
    .addNode('node1', (state) => ({ my_key: 'hello from node1' }))
    .addNode('node2', (state) => ({ my_key: 'hello from node2' }))
    .addNode('node3', (state) => ({ my_key: 'hello from node3' }))
    .addNode('node4', (state) => ({ my_key: 'hello from node4' }))
    .addEdge(START, 'node1')
    .addEdge('node1', 'node2')
    .addEdge('node2', 'node3')
    .addEdge('node3', 'node4')
    .addEdge('node4', END);
};

test('partial execution from node2 to node3', async () => {
  const uncompiledGraph = createGraph();
  const checkpointer = new MemorySaver();
  const compiledGraph = uncompiledGraph.compile({ checkpointer });
  await compiledGraph.updateState(
    { configurable: { thread_id: '1' } },
    // The state passed into node 2 - simulating the state at
    // the end of node 1
    { my_key: 'initial_value' },
    // Update saved state as if it came from node 1
    // Execution will resume at node 2
    'node1',
  );
  const result = await compiledGraph.invoke(
    // Resume execution by passing None
    null,
    {
      configurable: { thread_id: '1' },
      // Stop after node 3 so that node 4 doesn't run
      interruptAfter: ['node3']
    },
  );
  expect(result.my_key).toBe('hello from node3');
});
```

***

<Callout icon="pen-to-square" iconType="regular">
  [Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/oss/langgraph/test.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).
</Callout>

<Tip icon="terminal" iconType="regular">
  [Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.
</Tip>

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.langchain.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Agent Chat UI

[Agent Chat UI](https://github.com/langchain-ai/agent-chat-ui) is a Next.js application that provides a conversational interface for interacting with any LangChain agent. It supports real-time chat, tool visualization, and advanced features like time-travel debugging and state forking. Agent Chat UI works seamlessly with agents created using [`create_agent`](../langchain/agents) and provides interactive experiences for your agents with minimal setup, whether you're running locally or in a deployed context (such as [LangSmith](/langsmith/home)).

Agent Chat UI is open source and can be adapted to your application needs.

<Frame>
  <iframe className="w-full aspect-video rounded-xl" src="https://www.youtube.com/embed/lInrwVnZ83o?si=Uw66mPtCERJm0EjU" title="Agent Chat UI" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
</Frame>

<Tip>
  You can use generative UI in the Agent Chat UI. For more information, see [Implement generative user interfaces with LangGraph](/langsmith/generative-ui-react).
</Tip>

### Quick start

The fastest way to get started is using the hosted version:

1. **Visit [Agent Chat UI](https://agentchat.vercel.app)**
2. **Connect your agent** by entering your deployment URL or local server address
3. **Start chatting** - the UI will automatically detect and render tool calls and interrupts

### Local development

For customization or local development, you can run Agent Chat UI locally:

<CodeGroup>
  ```bash Use npx theme={null}
  # Create a new Agent Chat UI project
  npx create-agent-chat-app --project-name my-chat-ui
  cd my-chat-ui

  # Install dependencies and start
  pnpm install
  pnpm dev
  ```

  ```bash Clone repository theme={null}
  # Clone the repository
  git clone https://github.com/langchain-ai/agent-chat-ui.git
  cd agent-chat-ui

  # Install dependencies and start
  pnpm install
  pnpm dev
  ```
</CodeGroup>

### Connect to your agent

Agent Chat UI can connect to both [local](/oss/javascript/langgraph/studio#setup-local-agent-server) and [deployed agents](/oss/javascript/langgraph/deploy).

After starting Agent Chat UI, you'll need to configure it to connect to your agent:

1. **Graph ID**: Enter your graph name (find this under `graphs` in your `langgraph.json` file)
2. **Deployment URL**: Your Agent server's endpoint (e.g., `http://localhost:2024` for local development, or your deployed agent's URL)
3. **LangSmith API key (optional)**: Add your LangSmith API key (not required if you're using a local Agent server)

Once configured, Agent Chat UI will automatically fetch and display any interrupted threads from your agent.

<Tip>
  Agent Chat UI has out-of-the-box support for rendering tool calls and tool result messages. To customize what messages are shown, see [Hiding Messages in the Chat](https://github.com/langchain-ai/agent-chat-ui?tab=readme-ov-file#hiding-messages-in-the-chat).
</Tip>

***

<Callout icon="pen-to-square" iconType="regular">
  [Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/oss/langgraph/ui.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).
</Callout>

<Tip icon="terminal" iconType="regular">
  [Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.
</Tip>

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.langchain.com/llms.txt
> Use this file to discover all available pages before exploring further.

# LangSmith Deployment

This guide shows you how to deploy your agent to **[LangSmith Cloud](/langsmith/deploy-to-cloud)**, a fully managed hosting platform designed for agent workloads. With Cloud deployment, you can deploy directly from your GitHub repository—LangSmith handles the infrastructure, scaling, and operational concerns.

Traditional hosting platforms are built for stateless, short-lived web applications. LangSmith Cloud is **purpose-built for stateful, long-running agents** that require persistent state and background execution.

<Tip>
  LangSmith offers multiple deployment options beyond Cloud, including deploying with a [control plane (hybrid/self-hosted)](/langsmith/deploy-with-control-plane) or as [standalone servers](/langsmith/deploy-standalone-server). For more information, refer to the [Deployment overview](/langsmith/deployments).
</Tip>

## Prerequisites

Before you begin, ensure you have the following:

* A [GitHub account](https://github.com/)
* A [LangSmith account](https://smith.langchain.com/) (free to sign up)

## Deploy your agent

### 1. Create a repository on GitHub

Your application's code must reside in a GitHub repository to be deployed on LangSmith. Both public and private repositories are supported. For this quickstart, first make sure your app is LangGraph-compatible by following the [local server setup guide](/oss/javascript/langgraph/studio#setup-local-agent-server). Then, push your code to the repository.

### 2. Deploy to LangSmith

<Steps>
  <Step title="Navigate to LangSmith Deployment">
    Log in to [LangSmith](https://smith.langchain.com/). In the left sidebar, select **Deployments**.
  </Step>

  <Step title="Create new deployment">
    Click the **+ New Deployment** button. A pane will open where you can fill in the required fields.
  </Step>

  <Step title="Link repository">
    If you are a first time user or adding a private repository that has not been previously connected, click the **Add new account** button and follow the instructions to connect your GitHub account.
  </Step>

  <Step title="Deploy repository">
    Select your application's repository. Click **Submit** to deploy. This may take about 15 minutes to complete. You can check the status in the **Deployment details** view.
  </Step>
</Steps>

### 3. Test your application in Studio

Once your application is deployed:

1. Select the deployment you just created to view more details.
2. Click the **Studio** button in the top right corner. Studio will open to display your graph.

### 4. Get the API URL for your deployment

1. In the **Deployment details** view in LangGraph, click the **API URL** to copy it to your clipboard.
2. Click the `URL` to copy it to the clipboard.

### 5. Test the API

You can now test the API:

<Tabs>
  <Tab title="TypeScript">
    1. Install LangGraph SDK:

    ```shell  theme={null}
    npm install @langchain/langgraph-sdk
    ```

    2. Send a message to the agent:

    ```ts  theme={null}
    import { Client } from "@langchain/langgraph-sdk";

    const client = new Client({ apiUrl: "your-deployment-url", apiKey: "your-langsmith-api-key" });

    const streamResponse = client.runs.stream(
      null,    // Threadless run
      "agent", // Name of agent. Defined in langgraph.json.
      {
        input: {
          "messages": [
            { "role": "user", "content": "What is LangGraph?"}
          ]
        },
        streamMode: "messages",
      }
    );

    for await (const chunk of streamResponse) {
      console.log(`Receiving new event of type: ${chunk.event}...`);
      console.log(JSON.stringify(chunk.data));
      console.log("\n\n");
    }
    ```
  </Tab>

  <Tab title="Rest API">
    ```bash  theme={null}
    curl -s --request POST \
        --url <DEPLOYMENT_URL>/runs/stream \
        --header 'Content-Type: application/json' \
        --header "X-Api-Key: <LANGSMITH API KEY> \
        --data "{
            \"assistant_id\": \"agent\", `# Name of agent. Defined in langgraph.json.`
            \"input\": {
                \"messages\": [
                    {
                        \"role\": \"human\",
                        \"content\": \"What is LangGraph?\"
                    }
                ]
            },
            \"stream_mode\": \"updates\"
        }"
    ```
  </Tab>
</Tabs>

***

<Callout icon="pen-to-square" iconType="regular">
  [Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/oss/langgraph/deploy.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).
</Callout>

<Tip icon="terminal" iconType="regular">
  [Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.
</Tip>

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.langchain.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Agents

Agents combine language models with [tools](/oss/javascript/langchain/tools) to create systems that can reason about tasks, decide which tools to use, and iteratively work towards solutions.

`createAgent()` provides a production-ready agent implementation.

[An LLM Agent runs tools in a loop to achieve a goal](https://simonwillison.net/2025/Sep/18/agents/).
An agent runs until a stop condition is met - i.e., when the model emits a final output or an iteration limit is reached.

```mermaid  theme={null}
%%{
  init: {
    "fontFamily": "monospace",
    "flowchart": {
      "curve": "curve"
    },
    "themeVariables": {"edgeLabelBackground": "transparent"}
  }
}%%
graph TD
  %% Outside the agent
  QUERY([input])
  LLM{model}
  TOOL(tools)
  ANSWER([output])

  %% Main flows (no inline labels)
  QUERY --> LLM
  LLM --"action"--> TOOL
  TOOL --"observation"--> LLM
  LLM --"finish"--> ANSWER

  classDef blueHighlight fill:#0a1c25,stroke:#0a455f,color:#bae6fd;
  classDef greenHighlight fill:#0b1e1a,stroke:#0c4c39,color:#9ce4c4;
  class QUERY blueHighlight;
  class ANSWER blueHighlight;
```

<Info>
  `createAgent()` builds a **graph**-based agent runtime using [LangGraph](/oss/javascript/langgraph/overview). A graph consists of nodes (steps) and edges (connections) that define how your agent processes information. The agent moves through this graph, executing nodes like the model node (which calls the model), the tools node (which executes tools), or middleware.

  Learn more about the [Graph API](/oss/javascript/langgraph/graph-api).
</Info>

## Core components

### Model

The [model](/oss/javascript/langchain/models) is the reasoning engine of your agent. It can be specified in multiple ways, supporting both static and dynamic model selection.

#### Static model

Static models are configured once when creating the agent and remain unchanged throughout execution. This is the most common and straightforward approach.

To initialize a static model from a <Tooltip tip="A string that follows the format `provider:model` (e.g. openai:gpt-5)" cta="See mappings" href="https://reference.langchain.com/python/langchain/models/#langchain.chat_models.init_chat_model(model)">model identifier string</Tooltip>:

```ts wrap theme={null}
import { createAgent } from "langchain";

const agent = createAgent({
  model: "openai:gpt-5",
  tools: []
});
```

Model identifier strings use the format `provider:model` (e.g. `"openai:gpt-5"`). You may want more control over the model configuration, in which case you can initialize a model instance directly using the provider package:

```ts wrap theme={null}
import { createAgent } from "langchain";
import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
  model: "gpt-4o",
  temperature: 0.1,
  maxTokens: 1000,
  timeout: 30
});

const agent = createAgent({
  model,
  tools: []
});
```

Model instances give you complete control over configuration. Use them when you need to set specific parameters like `temperature`, `max_tokens`, `timeouts`, or configure API keys, `base_url`, and other provider-specific settings. Refer to the [API reference](/oss/javascript/integrations/providers/) to see available params and methods on your model.

#### Dynamic model

Dynamic models are selected at <Tooltip tip="The execution environment of your agent, containing immutable configuration and contextual data that persists throughout the agent's execution (e.g., user IDs, session details, or application-specific configuration).">runtime</Tooltip> based on the current <Tooltip tip="The data that flows through your agent's execution, including messages, custom fields, and any information that needs to be tracked and potentially modified during processing (e.g., user preferences or tool usage stats).">state</Tooltip> and context. This enables sophisticated routing logic and cost optimization.

To use a dynamic model, create middleware with `wrapModelCall` that modifies the model in the request:

```ts  theme={null}
import { ChatOpenAI } from "@langchain/openai";
import { createAgent, createMiddleware } from "langchain";

const basicModel = new ChatOpenAI({ model: "gpt-4o-mini" });
const advancedModel = new ChatOpenAI({ model: "gpt-4o" });

const dynamicModelSelection = createMiddleware({
  name: "DynamicModelSelection",
  wrapModelCall: (request, handler) => {
    // Choose model based on conversation complexity
    const messageCount = request.messages.length;

    return handler({
        ...request,
        model: messageCount > 10 ? advancedModel : basicModel,
    });
  },
});

const agent = createAgent({
  model: "gpt-4o-mini", // Base model (used when messageCount ≤ 10)
  tools,
  middleware: [dynamicModelSelection],
});
```

For more details on middleware and advanced patterns, see the [middleware documentation](/oss/javascript/langchain/middleware).

<Tip>
  For model configuration details, see [Models](/oss/javascript/langchain/models). For dynamic model selection patterns, see [Dynamic model in middleware](/oss/javascript/langchain/middleware#dynamic-model).
</Tip>

### Tools

Tools give agents the ability to take actions. Agents go beyond simple model-only tool binding by facilitating:

* Multiple tool calls in sequence (triggered by a single prompt)
* Parallel tool calls when appropriate
* Dynamic tool selection based on previous results
* Tool retry logic and error handling
* State persistence across tool calls

For more information, see [Tools](/oss/javascript/langchain/tools).

#### Defining tools

Pass a list of tools to the agent.

```ts wrap theme={null}
import * as z from "zod";
import { createAgent, tool } from "langchain";

const search = tool(
  ({ query }) => `Results for: ${query}`,
  {
    name: "search",
    description: "Search for information",
    schema: z.object({
      query: z.string().describe("The query to search for"),
    }),
  }
);

const getWeather = tool(
  ({ location }) => `Weather in ${location}: Sunny, 72°F`,
  {
    name: "get_weather",
    description: "Get weather information for a location",
    schema: z.object({
      location: z.string().describe("The location to get weather for"),
    }),
  }
);

const agent = createAgent({
  model: "gpt-4o",
  tools: [search, getWeather],
});
```

If an empty tool list is provided, the agent will consist of a single LLM node without tool-calling capabilities.

#### Tool error handling

To customize how tool errors are handled, use the `wrapToolCall` hook in a custom middleware:

```ts wrap theme={null}
import { createAgent, createMiddleware, ToolMessage } from "langchain";

const handleToolErrors = createMiddleware({
  name: "HandleToolErrors",
  wrapToolCall: async (request, handler) => {
    try {
      return await handler(request);
    } catch (error) {
      // Return a custom error message to the model
      return new ToolMessage({
        content: `Tool error: Please check your input and try again. (${error})`,
        tool_call_id: request.toolCall.id!,
      });
    }
  },
});

const agent = createAgent({
  model: "gpt-4o",
  tools: [
    /* ... */
  ],
  middleware: [handleToolErrors],
});
```

The agent will return a [`ToolMessage`](https://reference.langchain.com/javascript/classes/_langchain_core.messages.ToolMessage.html) with the custom error message when a tool fails.

#### Tool use in the ReAct loop

Agents follow the ReAct ("Reasoning + Acting") pattern, alternating between brief reasoning steps with targeted tool calls and feeding the resulting observations into subsequent decisions until they can deliver a final answer.

<Accordion title="Example of ReAct loop">
  **Prompt:** Identify the current most popular wireless headphones and verify availability.

  ```
  ================================ Human Message =================================

  Find the most popular wireless headphones right now and check if they're in stock
  ```

  * **Reasoning**: "Popularity is time-sensitive, I need to use the provided search tool."
  * **Acting**: Call `search_products("wireless headphones")`

  ```
  ================================== Ai Message ==================================
  Tool Calls:
    search_products (call_abc123)
   Call ID: call_abc123
    Args:
      query: wireless headphones
  ```

  ```
  ================================= Tool Message =================================

  Found 5 products matching "wireless headphones". Top 5 results: WH-1000XM5, ...
  ```

  * **Reasoning**: "I need to confirm availability for the top-ranked item before answering."
  * **Acting**: Call `check_inventory("WH-1000XM5")`

  ```
  ================================== Ai Message ==================================
  Tool Calls:
    check_inventory (call_def456)
   Call ID: call_def456
    Args:
      product_id: WH-1000XM5
  ```

  ```
  ================================= Tool Message =================================

  Product WH-1000XM5: 10 units in stock
  ```

  * **Reasoning**: "I have the most popular model and its stock status. I can now answer the user's question."
  * **Acting**: Produce final answer

  ```
  ================================== Ai Message ==================================

  I found wireless headphones (model WH-1000XM5) with 10 units in stock...
  ```
</Accordion>

#### Dynamic tools

In some scenarios, you need to modify the set of tools available to the agent at runtime rather than defining them all upfront. There are two approaches depending on whether tools are known ahead of time:

<Tabs>
  <Tab title="Filtering pre-registered tools">
    When all possible tools are known at agent creation time, you can pre-register them and dynamically filter which ones are exposed to the model based on state, permissions, or context.

    ```typescript  theme={null}
    import { createAgent, createMiddleware } from "langchain";

    const filterTools = createMiddleware({
      name: "FilterTools",
      wrapModelCall: (request, handler) => {
        const userRole = request.runtime.context.userRole;

        let tools;
        if (userRole === "admin") {
          // Admins get all tools
          tools = request.tools;
        } else {
          // Regular users get read-only tools
          tools = request.tools.filter((t) => t.name.startsWith("read_"));
        }

        return handler({ ...request, tools });
      },
    });

    const agent = createAgent({
      model: "gpt-4o",
      tools: [readData, writeData, deleteData], // All tools pre-registered
      middleware: [filterTools],
    });
    ```

    This approach is best when:

    * All possible tools are known at compile/startup time
    * You want to filter based on permissions, feature flags, or conversation state
    * Tools are static but their availability is dynamic

    See [Dynamically selecting tools](/oss/javascript/langchain/middleware/custom#dynamically-selecting-tools) for more examples.
  </Tab>

  <Tab title="Runtime tool registration">
    When tools are discovered or created at runtime (e.g., loaded from an MCP server, generated based on user data, or fetched from a remote registry), you need to both register the tools and handle their execution dynamically.

    This requires two middleware hooks:

    1. `wrap_model_call` - Add the dynamic tools to the request
    2. `wrap_tool_call` - Handle execution of the dynamically added tools

    ```typescript  theme={null}
    import { createAgent, createMiddleware, tool } from "langchain";
    import * as z from "zod";

    // A tool that will be added dynamically at runtime
    const calculateTip = tool(
      ({ billAmount, tipPercentage = 20 }) => {
        const tip = billAmount * (tipPercentage / 100);
        return `Tip: $${tip.toFixed(2)}, Total: $${(billAmount + tip).toFixed(2)}`;
      },
      {
        name: "calculate_tip",
        description: "Calculate the tip amount for a bill",
        schema: z.object({
          billAmount: z.number().describe("The bill amount"),
          tipPercentage: z.number().default(20).describe("Tip percentage"),
        }),
      }
    );

    const dynamicToolMiddleware = createMiddleware({
      name: "DynamicToolMiddleware",
      wrapModelCall: (request, handler) => {
        // Add dynamic tool to the request
        // This could be loaded from an MCP server, database, etc.
        return handler({
          ...request,
          tools: [...request.tools, calculateTip],
        });
      },
      wrapToolCall: (request, handler) => {
        // Handle execution of the dynamic tool
        if (request.toolCall.name === "calculate_tip") {
          return handler({ ...request, tool: calculateTip });
        }
        return handler(request);
      },
    });

    const agent = createAgent({
      model: "gpt-4o",
      tools: [getWeather], // Only static tools registered here
      middleware: [dynamicToolMiddleware],
    });

    // The agent can now use both getWeather AND calculateTip
    const result = await agent.invoke({
      messages: [{ role: "user", content: "Calculate a 20% tip on $85" }],
    });
    ```

    This approach is best when:

    * Tools are discovered at runtime (e.g., from an MCP server)
    * Tools are generated dynamically based on user data or configuration
    * You're integrating with external tool registries

    <Note>
      The `wrap_tool_call` hook is required for runtime-registered tools because the agent needs to know how to execute tools that weren't in the original tool list. Without it, the agent won't know how to invoke the dynamically added tool.
    </Note>
  </Tab>
</Tabs>

<Tip>
  To learn more about tools, see [Tools](/oss/javascript/langchain/tools).
</Tip>

### System prompt

You can shape how your agent approaches tasks by providing a prompt. The `systemPrompt` parameter can be provided as a string:

```ts wrap theme={null}
const agent = createAgent({
  model,
  tools,
  systemPrompt: "You are a helpful assistant. Be concise and accurate.",
});
```

When no `systemPrompt` is provided, the agent will infer its task from the messages directly.

The `systemPrompt` parameter accepts either a `string` or a `SystemMessage`. Using a `SystemMessage` gives you more control over the prompt structure, which is useful for provider-specific features like [Anthropic's prompt caching](/oss/javascript/integrations/chat/anthropic#prompt-caching):

```ts wrap theme={null}
import { createAgent } from "langchain";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";

const literaryAgent = createAgent({
  model: "anthropic:claude-sonnet-4-5",
  systemPrompt: new SystemMessage({
    content: [
      {
        type: "text",
        text: "You are an AI assistant tasked with analyzing literary works.",
      },
      {
        type: "text",
        text: "<the entire contents of 'Pride and Prejudice'>",
        cache_control: { type: "ephemeral" }
      }
    ]
  })
});

const result = await literaryAgent.invoke({
  messages: [new HumanMessage("Analyze the major themes in 'Pride and Prejudice'.")]
});
```

The `cache_control` field with `{ type: "ephemeral" }` tells Anthropic to cache that content block, reducing latency and costs for repeated requests that use the same system prompt.

#### Dynamic system prompt

For more advanced use cases where you need to modify the system prompt based on runtime context or agent state, you can use [middleware](/oss/javascript/langchain/middleware).

```typescript wrap theme={null}
import * as z from "zod";
import { createAgent, dynamicSystemPromptMiddleware } from "langchain";

const contextSchema = z.object({
  userRole: z.enum(["expert", "beginner"]),
});

const agent = createAgent({
  model: "gpt-4o",
  tools: [/* ... */],
  contextSchema,
  middleware: [
    dynamicSystemPromptMiddleware<z.infer<typeof contextSchema>>((state, runtime) => {
      const userRole = runtime.context.userRole || "user";
      const basePrompt = "You are a helpful assistant.";

      if (userRole === "expert") {
        return `${basePrompt} Provide detailed technical responses.`;
      } else if (userRole === "beginner") {
        return `${basePrompt} Explain concepts simply and avoid jargon.`;
      }
      return basePrompt;
    }),
  ],
});

// The system prompt will be set dynamically based on context
const result = await agent.invoke(
  { messages: [{ role: "user", content: "Explain machine learning" }] },
  { context: { userRole: "expert" } }
);
```

<Tip>
  For more details on message types and formatting, see [Messages](/oss/javascript/langchain/messages). For comprehensive middleware documentation, see [Middleware](/oss/javascript/langchain/middleware).
</Tip>

## Invocation

You can invoke an agent by passing an update to its [`State`](/oss/javascript/langgraph/graph-api#state). All agents include a [sequence of messages](/oss/javascript/langgraph/use-graph-api#messagesstate) in their state; to invoke the agent, pass a new message:

```typescript  theme={null}
await agent.invoke({
  messages: [{ role: "user", content: "What's the weather in San Francisco?" }],
})
```

For streaming steps and / or tokens from the agent, refer to the [streaming](/oss/javascript/langchain/streaming) guide.

Otherwise, the agent follows the LangGraph [Graph API](/oss/javascript/langgraph/use-graph-api) and supports all associated methods, such as `stream` and `invoke`.

## Advanced concepts

### Structured output

In some situations, you may want the agent to return an output in a specific format. LangChain provides a simple, universal way to do this with the `responseFormat` parameter.

```ts wrap theme={null}
import * as z from "zod";
import { createAgent } from "langchain";

const ContactInfo = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
});

const agent = createAgent({
  model: "gpt-4o",
  responseFormat: ContactInfo,
});

const result = await agent.invoke({
  messages: [
    {
      role: "user",
      content: "Extract contact info from: John Doe, john@example.com, (555) 123-4567",
    },
  ],
});

console.log(result.structuredResponse);
// {
//   name: 'John Doe',
//   email: 'john@example.com',
//   phone: '(555) 123-4567'
// }
```

<Tip>
  To learn about structured output, see [Structured output](/oss/javascript/langchain/structured-output).
</Tip>

### Memory

Agents maintain conversation history automatically through the message state. You can also configure the agent to use a custom state schema to remember additional information during the conversation.

Information stored in the state can be thought of as the [short-term memory](/oss/javascript/langchain/short-term-memory) of the agent:

```ts wrap theme={null}
import { z } from "zod/v4";
import { StateSchema, MessagesValue } from "@langchain/langgraph";
import { createAgent } from "langchain";

const CustomAgentState = new StateSchema({
  messages: MessagesValue,
  userPreferences: z.record(z.string(), z.string()),
});

const customAgent = createAgent({
  model: "gpt-4o",
  tools: [],
  stateSchema: CustomAgentState,
});
```

<Tip>
  To learn more about memory, see [Memory](/oss/javascript/concepts/memory). For information on implementing long-term memory that persists across sessions, see [Long-term memory](/oss/javascript/langchain/long-term-memory).
</Tip>

### Streaming

We've seen how the agent can be called with `invoke` to get a final response. If the agent executes multiple steps, this may take a while. To show intermediate progress, we can stream back messages as they occur.

```ts  theme={null}
const stream = await agent.stream(
  {
    messages: [{
      role: "user",
      content: "Search for AI news and summarize the findings"
    }],
  },
  { streamMode: "values" }
);

for await (const chunk of stream) {
  // Each chunk contains the full state at that point
  const latestMessage = chunk.messages.at(-1);
  if (latestMessage?.content) {
    console.log(`Agent: ${latestMessage.content}`);
  } else if (latestMessage?.tool_calls) {
    const toolCallNames = latestMessage.tool_calls.map((tc) => tc.name);
    console.log(`Calling tools: ${toolCallNames.join(", ")}`);
  }
}
```

<Tip>
  For more details on streaming, see [Streaming](/oss/javascript/langchain/streaming).
</Tip>

### Middleware

[Middleware](/oss/javascript/langchain/middleware) provides powerful extensibility for customizing agent behavior at different stages of execution. You can use middleware to:

* Process state before the model is called (e.g., message trimming, context injection)
* Modify or validate the model's response (e.g., guardrails, content filtering)
* Handle tool execution errors with custom logic
* Implement dynamic model selection based on state or context
* Add custom logging, monitoring, or analytics

Middleware integrates seamlessly into the agent's execution, allowing you to intercept and modify data flow at key points without changing the core agent logic.

<Tip>
  For comprehensive middleware documentation including hooks like `beforeModel`, `afterModel`, and `wrapToolCall`, see [Middleware](/oss/javascript/langchain/middleware).
</Tip>

***

<Callout icon="pen-to-square" iconType="regular">
  [Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/oss/langchain/agents.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).
</Callout>

<Tip icon="terminal" iconType="regular">
  [Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.
</Tip>

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.langchain.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Models

[LLMs](https://en.wikipedia.org/wiki/Large_language_model) are powerful AI tools that can interpret and generate text like humans. They're versatile enough to write content, translate languages, summarize, and answer questions without needing specialized training for each task.

In addition to text generation, many models support:

* <Icon icon="hammer" size={16} /> [Tool calling](#tool-calling) - calling external tools (like databases queries or API calls) and use results in their responses.
* <Icon icon="shapes" size={16} /> [Structured output](#structured-output) - where the model's response is constrained to follow a defined format.
* <Icon icon="image" size={16} /> [Multimodality](#multimodal) - process and return data other than text, such as images, audio, and video.
* <Icon icon="brain" size={16} /> [Reasoning](#reasoning) - models perform multi-step reasoning to arrive at a conclusion.

Models are the reasoning engine of [agents](/oss/javascript/langchain/agents). They drive the agent's decision-making process, determining which tools to call, how to interpret results, and when to provide a final answer.

The quality and capabilities of the model you choose directly impact your agent's baseline reliability and performance. Different models excel at different tasks - some are better at following complex instructions, others at structured reasoning, and some support larger context windows for handling more information.

LangChain's standard model interfaces give you access to many different provider integrations, which makes it easy to experiment with and switch between models to find the best fit for your use case.

<Info>
  For provider-specific integration information and capabilities, see the provider's [chat model page](/oss/javascript/integrations/chat).
</Info>

## Basic usage

Models can be utilized in two ways:

1. **With agents** - Models can be dynamically specified when creating an [agent](/oss/javascript/langchain/agents#model).
2. **Standalone** - Models can be called directly (outside of the agent loop) for tasks like text generation, classification, or extraction without the need for an agent framework.

The same model interface works in both contexts, which gives you the flexibility to start simple and scale up to more complex agent-based workflows as needed.

### Initialize a model

The easiest way to get started with a standalone model in LangChain is to use `initChatModel` to initialize one from a [chat model provider](/oss/javascript/integrations/chat) of your choice (examples below):

<Tabs>
  <Tab title="OpenAI">
    👉 Read the [OpenAI chat model integration docs](/oss/javascript/integrations/chat/openai/)

    <CodeGroup>
      ```bash npm theme={null}
      npm install @langchain/openai
      ```

      ```bash pnpm theme={null}
      pnpm install @langchain/openai
      ```

      ```bash yarn theme={null}
      yarn add @langchain/openai
      ```

      ```bash bun theme={null}
      bun add @langchain/openai
      ```
    </CodeGroup>

    <CodeGroup>
      ```typescript initChatModel theme={null}
      import { initChatModel } from "langchain";

      process.env.OPENAI_API_KEY = "your-api-key";

      const model = await initChatModel("gpt-4.1");
      ```

      ```typescript Model Class theme={null}
      import { ChatOpenAI } from "@langchain/openai";

      const model = new ChatOpenAI({
        model: "gpt-4.1",
        apiKey: "your-api-key"
      });
      ```
    </CodeGroup>
  </Tab>

  <Tab title="Anthropic">
    👉 Read the [Anthropic chat model integration docs](/oss/javascript/integrations/chat/anthropic/)

    <CodeGroup>
      ```bash npm theme={null}
      npm install @langchain/anthropic
      ```

      ```bash pnpm theme={null}
      pnpm install @langchain/anthropic
      ```

      ```bash yarn theme={null}
      yarn add @langchain/anthropic
      ```

      ```bash pnpm theme={null}
      pnpm add @langchain/anthropic
      ```
    </CodeGroup>

    <CodeGroup>
      ```typescript initChatModel theme={null}
      import { initChatModel } from "langchain";

      process.env.ANTHROPIC_API_KEY = "your-api-key";

      const model = await initChatModel("claude-sonnet-4-5-20250929");
      ```

      ```typescript Model Class theme={null}
      import { ChatAnthropic } from "@langchain/anthropic";

      const model = new ChatAnthropic({
        model: "claude-sonnet-4-5-20250929",
        apiKey: "your-api-key"
      });
      ```
    </CodeGroup>
  </Tab>

  <Tab title="Azure">
    👉 Read the [Azure chat model integration docs](/oss/javascript/integrations/chat/azure/)

    <CodeGroup>
      ```bash npm theme={null}
      npm install @langchain/azure
      ```

      ```bash pnpm theme={null}
      pnpm install @langchain/azure
      ```

      ```bash yarn theme={null}
      yarn add @langchain/azure
      ```

      ```bash bun theme={null}
      bun add @langchain/azure
      ```
    </CodeGroup>

    <CodeGroup>
      ```typescript initChatModel theme={null}
      import { initChatModel } from "langchain";

      process.env.AZURE_OPENAI_API_KEY = "your-api-key";
      process.env.AZURE_OPENAI_ENDPOINT = "your-endpoint";
      process.env.OPENAI_API_VERSION = "your-api-version";

      const model = await initChatModel("azure_openai:gpt-4.1");
      ```

      ```typescript Model Class theme={null}
      import { AzureChatOpenAI } from "@langchain/openai";

      const model = new AzureChatOpenAI({
        model: "gpt-4.1",
        azureOpenAIApiKey: "your-api-key",
        azureOpenAIApiEndpoint: "your-endpoint",
        azureOpenAIApiVersion: "your-api-version"
      });
      ```
    </CodeGroup>
  </Tab>

  <Tab title="Google Gemini">
    👉 Read the [Google GenAI chat model integration docs](/oss/javascript/integrations/chat/google_generative_ai/)

    <CodeGroup>
      ```bash npm theme={null}
      npm install @langchain/google-genai
      ```

      ```bash pnpm theme={null}
      pnpm install @langchain/google-genai
      ```

      ```bash yarn theme={null}
      yarn add @langchain/google-genai
      ```

      ```bash bun theme={null}
      bun add @langchain/google-genai
      ```
    </CodeGroup>

    <CodeGroup>
      ```typescript initChatModel theme={null}
      import { initChatModel } from "langchain";

      process.env.GOOGLE_API_KEY = "your-api-key";

      const model = await initChatModel("google-genai:gemini-2.5-flash-lite");
      ```

      ```typescript Model Class theme={null}
      import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

      const model = new ChatGoogleGenerativeAI({
        model: "gemini-2.5-flash-lite",
        apiKey: "your-api-key"
      });
      ```
    </CodeGroup>
  </Tab>

  <Tab title="Bedrock Converse">
    👉 Read the [AWS Bedrock chat model integration docs](/oss/javascript/integrations/chat/bedrock_converse/)

    <CodeGroup>
      ```bash npm theme={null}
      npm install @langchain/aws
      ```

      ```bash pnpm theme={null}
      pnpm install @langchain/aws
      ```

      ```bash yarn theme={null}
      yarn add @langchain/aws
      ```

      ```bash bun theme={null}
      bun add @langchain/aws
      ```
    </CodeGroup>

    <CodeGroup>
      ```typescript initChatModel theme={null}
      import { initChatModel } from "langchain";

      // Follow the steps here to configure your credentials:
      // https://docs.aws.amazon.com/bedrock/latest/userguide/getting-started.html

      const model = await initChatModel("bedrock:gpt-4.1");
      ```

      ```typescript Model Class theme={null}
      import { ChatBedrockConverse } from "@langchain/aws";

      // Follow the steps here to configure your credentials:
      // https://docs.aws.amazon.com/bedrock/latest/userguide/getting-started.html

      const model = new ChatBedrockConverse({
        model: "gpt-4.1",
        region: "us-east-2"
      });
      ```
    </CodeGroup>
  </Tab>
</Tabs>

```typescript  theme={null}
const response = await model.invoke("Why do parrots talk?");
```

See [`initChatModel`](https://reference.langchain.com/javascript/functions/langchain.chat_models_universal.initChatModel.html) for more detail, including information on how to pass model [parameters](#parameters).

### Supported models

LangChain supports all major model providers, including OpenAI, Anthropic, Google, Azure, AWS Bedrock, and more. Each provider offers a variety of models with different capabilities. For a full list of supported models in LangChain, see the [integrations page](/oss/javascript/integrations/providers/overview).

### Key methods

<Card title="Invoke" href="#invoke" icon="paper-plane" arrow="true" horizontal>
  The model takes messages as input and outputs messages after generating a complete response.
</Card>

<Card title="Stream" href="#stream" icon="tower-broadcast" arrow="true" horizontal>
  Invoke the model, but stream the output as it is generated in real-time.
</Card>

<Card title="Batch" href="#batch" icon="grip" arrow="true" horizontal>
  Send multiple requests to a model in a batch for more efficient processing.
</Card>

<Info>
  In addition to chat models, LangChain provides support for other adjacent technologies, such as embedding models and vector stores. See the [integrations page](/oss/javascript/integrations/providers/overview) for details.
</Info>

## Parameters

A chat model takes parameters that can be used to configure its behavior. The full set of supported parameters varies by model and provider, but standard ones include:

<ParamField body="model" type="string" required>
  The name or identifier of the specific model you want to use with a provider. You can also specify both the model and its provider in a single argument using the '{model_provider}:{model}' format, for example, 'openai:o1'.
</ParamField>

<ParamField body="apiKey" type="string">
  The key required for authenticating with the model's provider. This is usually issued when you sign up for access to the model. Often accessed by setting an <Tooltip tip="A variable whose value is set outside the program, typically through functionality built into the operating system or microservice.">environment variable</Tooltip>.
</ParamField>

<ParamField body="temperature" type="number">
  Controls the randomness of the model's output. A higher number makes responses more creative; lower ones make them more deterministic.
</ParamField>

<ParamField body="maxTokens" type="number">
  Limits the total number of <Tooltip tip="The basic unit that a model reads and generates. Providers may define them differently, but in general, they can represent a whole or part of word.">tokens</Tooltip> in the response, effectively controlling how long the output can be.
</ParamField>

<ParamField body="timeout" type="number">
  The maximum time (in seconds) to wait for a response from the model before canceling the request.
</ParamField>

<ParamField body="maxRetries" type="number">
  The maximum number of attempts the system will make to resend a request if it fails due to issues like network timeouts or rate limits.
</ParamField>

Using `initChatModel`, pass these parameters as inline parameters:

```typescript Initialize using model parameters theme={null}
const model = await initChatModel(
    "claude-sonnet-4-5-20250929",
    { temperature: 0.7, timeout: 30, max_tokens: 1000 }
)
```

<Info>
  Each chat model integration may have additional params used to control provider-specific functionality.

  For example, [`ChatOpenAI`](https://reference.langchain.com/javascript/classes/_langchain_openai.ChatOpenAI.html) has `use_responses_api` to dictate whether to use the OpenAI Responses or Completions API.

  To find all the parameters supported by a given chat model, head to the [chat model integrations](/oss/javascript/integrations/chat) page.
</Info>

***

## Invocation

A chat model must be invoked to generate an output. There are three primary invocation methods, each suited to different use cases.

### Invoke

The most straightforward way to call a model is to use [`invoke()`](https://reference.langchain.com/javascript/classes/_langchain_core.language_models_chat_models.BaseChatModel.html#invoke) with a single message or a list of messages.

```typescript Single message theme={null}
const response = await model.invoke("Why do parrots have colorful feathers?");
console.log(response);
```

A list of messages can be provided to a chat model to represent conversation history. Each message has a role that models use to indicate who sent the message in the conversation.

See the [messages](/oss/javascript/langchain/messages) guide for more detail on roles, types, and content.

```typescript Object format theme={null}
const conversation = [
  { role: "system", content: "You are a helpful assistant that translates English to French." },
  { role: "user", content: "Translate: I love programming." },
  { role: "assistant", content: "J'adore la programmation." },
  { role: "user", content: "Translate: I love building applications." },
];

const response = await model.invoke(conversation);
console.log(response);  // AIMessage("J'adore créer des applications.")
```

```typescript Message objects theme={null}
import { HumanMessage, AIMessage, SystemMessage } from "langchain";

const conversation = [
  new SystemMessage("You are a helpful assistant that translates English to French."),
  new HumanMessage("Translate: I love programming."),
  new AIMessage("J'adore la programmation."),
  new HumanMessage("Translate: I love building applications."),
];

const response = await model.invoke(conversation);
console.log(response);  // AIMessage("J'adore créer des applications.")
```

<Info>
  If the return type of your invocation is a string, ensure that you are using a chat model as opposed to a LLM. Legacy, text-completion LLMs return strings directly. LangChain chat models are prefixed with "Chat", e.g., [`ChatOpenAI`](https://reference.langchain.com/javascript/classes/_langchain_openai.ChatOpenAI.html)(/oss/integrations/chat/openai).
</Info>

### Stream

Most models can stream their output content while it is being generated. By displaying output progressively, streaming significantly improves user experience, particularly for longer responses.

Calling [`stream()`](https://reference.langchain.com/javascript/classes/_langchain_core.language_models_chat_models.BaseChatModel.html#stream) returns an <Tooltip tip="An object that progressively provides access to each item of a collection, in order.">iterator</Tooltip> that yields output chunks as they are produced. You can use a loop to process each chunk in real-time:

<CodeGroup>
  ```typescript Basic text streaming theme={null}
  const stream = await model.stream("Why do parrots have colorful feathers?");
  for await (const chunk of stream) {
    console.log(chunk.text)
  }
  ```

  ```typescript Stream tool calls, reasoning, and other content theme={null}
  const stream = await model.stream("What color is the sky?");
  for await (const chunk of stream) {
    for (const block of chunk.contentBlocks) {
      if (block.type === "reasoning") {
        console.log(`Reasoning: ${block.reasoning}`);
      } else if (block.type === "tool_call_chunk") {
        console.log(`Tool call chunk: ${block}`);
      } else if (block.type === "text") {
        console.log(block.text);
      } else {
        ...
      }
    }
  }
  ```
</CodeGroup>

As opposed to [`invoke()`](#invoke), which returns a single [`AIMessage`](https://reference.langchain.com/javascript/classes/_langchain_core.messages.AIMessage.html) after the model has finished generating its full response, `stream()` returns multiple [`AIMessageChunk`](https://reference.langchain.com/javascript/classes/_langchain_core.messages.AIMessageChunk.html) objects, each containing a portion of the output text. Importantly, each chunk in a stream is designed to be gathered into a full message via summation:

```typescript Construct AIMessage theme={null}
let full: AIMessageChunk | null = null;
for await (const chunk of stream) {
  full = full ? full.concat(chunk) : chunk;
  console.log(full.text);
}

// The
// The sky
// The sky is
// The sky is typically
// The sky is typically blue
// ...

console.log(full.contentBlocks);
// [{"type": "text", "text": "The sky is typically blue..."}]
```

The resulting message can be treated the same as a message that was generated with [`invoke()`](#invoke) – for example, it can be aggregated into a message history and passed back to the model as conversational context.

<Warning>
  Streaming only works if all steps in the program know how to process a stream of chunks. For instance, an application that isn't streaming-capable would be one that needs to store the entire output in memory before it can be processed.
</Warning>

<Accordion title="Advanced streaming topics">
  <Accordion title="Streaming events">
    LangChain chat models can also stream semantic events using
    \[`streamEvents()`]\[BaseChatModel.streamEvents].

    This simplifies filtering based on event types and other metadata, and will aggregate the full message in the background. See below for an example.

    ```typescript  theme={null}
    const stream = await model.streamEvents("Hello");
    for await (const event of stream) {
        if (event.event === "on_chat_model_start") {
            console.log(`Input: ${event.data.input}`);
        }
        if (event.event === "on_chat_model_stream") {
            console.log(`Token: ${event.data.chunk.text}`);
        }
        if (event.event === "on_chat_model_end") {
            console.log(`Full message: ${event.data.output.text}`);
        }
    }
    ```

    ```txt  theme={null}
    Input: Hello
    Token: Hi
    Token:  there
    Token: !
    Token:  How
    Token:  can
    Token:  I
    ...
    Full message: Hi there! How can I help today?
    ```

    See the [`streamEvents()`](https://reference.langchain.com/javascript/classes/_langchain_core.language_models_chat_models.BaseChatModel.html#streamEvents) reference for event types and other details.
  </Accordion>

  <Accordion title="&#x22;Auto-streaming&#x22; chat models">
    LangChain simplifies streaming from chat models by automatically enabling streaming mode in certain cases, even when you're not explicitly calling the streaming methods. This is particularly useful when you use the non-streaming invoke method but still want to stream the entire application, including intermediate results from the chat model.

    In [LangGraph agents](/oss/javascript/langchain/agents), for example, you can call `model.invoke()` within nodes, but LangChain will automatically delegate to streaming if running in a streaming mode.

    #### How it works

    When you `invoke()` a chat model, LangChain will automatically switch to an internal streaming mode if it detects that you are trying to stream the overall application. The result of the invocation will be the same as far as the code that was using invoke is concerned; however, while the chat model is being streamed, LangChain will take care of invoking [`on_llm_new_token`](https://reference.langchain.com/javascript/interfaces/_langchain_core.callbacks_base.BaseCallbackHandlerMethods.html#onLlmNewToken) events in LangChain's callback system.

    Callback events allow LangGraph `stream()` and `streamEvents()` to surface the chat model's output in real-time.
  </Accordion>
</Accordion>

### Batch

Batching a collection of independent requests to a model can significantly improve performance and reduce costs, as the processing can be done in parallel:

```typescript Batch theme={null}
const responses = await model.batch([
  "Why do parrots have colorful feathers?",
  "How do airplanes fly?",
  "What is quantum computing?",
  "Why do parrots have colorful feathers?",
  "How do airplanes fly?",
  "What is quantum computing?",
]);
for (const response of responses) {
  console.log(response);
}
```

<Tip>
  When processing a large number of inputs using `batch()`, you may want to control the maximum number of parallel calls. This can be done by setting the `maxConcurrency` attribute in the [`RunnableConfig`](https://reference.langchain.com/javascript/interfaces/_langchain_core.runnables.RunnableConfig.html) dictionary.

  ```typescript Batch with max concurrency theme={null}
  model.batch(
    listOfInputs,
    {
      maxConcurrency: 5,  // Limit to 5 parallel calls
    }
  )
  ```

  See the [`RunnableConfig`](https://reference.langchain.com/javascript/interfaces/_langchain_core.runnables.RunnableConfig.html) reference for a full list of supported attributes.
</Tip>

For more details on batching, see the [reference](https://reference.langchain.com/javascript/classes/_langchain_core.language_models_chat_models.BaseChatModel.html#batch).

***

## Tool calling

Models can request to call tools that perform tasks such as fetching data from a database, searching the web, or running code. Tools are pairings of:

1. A schema, including the name of the tool, a description, and/or argument definitions (often a JSON schema)
2. A function or <Tooltip tip="A method that can suspend execution and resume at a later time">coroutine</Tooltip> to execute.

<Note>
  You may hear the term "function calling". We use this interchangeably with "tool calling".
</Note>

Here's the basic tool calling flow between a user and a model:

```mermaid  theme={null}
sequenceDiagram
    participant U as User
    participant M as Model
    participant T as Tools

    U->>M: "What's the weather in SF and NYC?"
    M->>M: Analyze request & decide tools needed

    par Parallel Tool Calls
        M->>T: getWeather("San Francisco")
        M->>T: getWeather("New York")
    end

    par Tool Execution
        T-->>M: SF weather data
        T-->>M: NYC weather data
    end

    M->>M: Process results & generate response
    M->>U: "SF: 72°F sunny, NYC: 68°F cloudy"
```

To make tools that you have defined available for use by a model, you must bind them using [`bindTools`](https://reference.langchain.com/javascript/classes/_langchain_core.language_models_chat_models.BaseChatModel.html#bindTools). In subsequent invocations, the model can choose to call any of the bound tools as needed.

Some model providers offer <Tooltip tip="Tools that are executed server-side, such as web search and code interpreters">built-in tools</Tooltip> that can be enabled via model or invocation parameters (e.g. [`ChatOpenAI`](/oss/javascript/integrations/chat/openai), [`ChatAnthropic`](/oss/javascript/integrations/chat/anthropic)). Check the respective [provider reference](/oss/javascript/integrations/providers/overview) for details.

<Tip>
  See the [tools guide](/oss/javascript/langchain/tools) for details and other options for creating tools.
</Tip>

```typescript Binding user tools theme={null}
import { tool } from "langchain";
import * as z from "zod";
import { ChatOpenAI } from "@langchain/openai";

const getWeather = tool(
  (input) => `It's sunny in ${input.location}.`,
  {
    name: "get_weather",
    description: "Get the weather at a location.",
    schema: z.object({
      location: z.string().describe("The location to get the weather for"),
    }),
  },
);

const model = new ChatOpenAI({ model: "gpt-4o" });
const modelWithTools = model.bindTools([getWeather]);  // [!code highlight]

const response = await modelWithTools.invoke("What's the weather like in Boston?");
const toolCalls = response.tool_calls || [];
for (const tool_call of toolCalls) {
  // View tool calls made by the model
  console.log(`Tool: ${tool_call.name}`);
  console.log(`Args: ${tool_call.args}`);
}
```

When binding user-defined tools, the model's response includes a **request** to execute a tool. When using a model separately from an [agent](/oss/javascript/langchain/agents), it is up to you to execute the requested tool and return the result back to the model for use in subsequent reasoning. When using an [agent](/oss/javascript/langchain/agents), the agent loop will handle the tool execution loop for you.

Below, we show some common ways you can use tool calling.

<AccordionGroup>
  <Accordion title="Tool execution loop" icon="arrow-rotate-right">
    When a model returns tool calls, you need to execute the tools and pass the results back to the model. This creates a conversation loop where the model can use tool results to generate its final response. LangChain includes [agent](/oss/javascript/langchain/agents) abstractions that handle this orchestration for you.

    Here's a simple example of how to do this:

    ```typescript Tool execution loop theme={null}
    // Bind (potentially multiple) tools to the model
    const modelWithTools = model.bindTools([get_weather])

    // Step 1: Model generates tool calls
    const messages = [{"role": "user", "content": "What's the weather in Boston?"}]
    const ai_msg = await modelWithTools.invoke(messages)
    messages.push(ai_msg)

    // Step 2: Execute tools and collect results
    for (const tool_call of ai_msg.tool_calls) {
        // Execute the tool with the generated arguments
        const tool_result = await get_weather.invoke(tool_call)
        messages.push(tool_result)
    }

    // Step 3: Pass results back to model for final response
    const final_response = await modelWithTools.invoke(messages)
    console.log(final_response.text)
    // "The current weather in Boston is 72°F and sunny."
    ```

    Each [`ToolMessage`](https://reference.langchain.com/javascript/classes/_langchain_core.messages.ToolMessage.html) returned by the tool includes a `tool_call_id` that matches the original tool call, helping the model correlate results with requests.
  </Accordion>

  <Accordion title="Forcing tool calls" icon="asterisk">
    By default, the model has the freedom to choose which bound tool to use based on the user's input. However, you might want to force choosing a tool, ensuring the model uses either a particular tool or **any** tool from a given list:

    <CodeGroup>
      ```typescript Force use of any tool theme={null}
      const modelWithTools = model.bindTools([tool_1], { toolChoice: "any" })
      ```

      ```typescript Force use of specific tools theme={null}
      const modelWithTools = model.bindTools([tool_1], { toolChoice: "tool_1" })
      ```
    </CodeGroup>
  </Accordion>

  <Accordion title="Parallel tool calls" icon="layer-group">
    Many models support calling multiple tools in parallel when appropriate. This allows the model to gather information from different sources simultaneously.

    ```typescript Parallel tool calls theme={null}
    const modelWithTools = model.bind_tools([get_weather])

    const response = await modelWithTools.invoke(
        "What's the weather in Boston and Tokyo?"
    )


    // The model may generate multiple tool calls
    console.log(response.tool_calls)
    // [
    //   { name: 'get_weather', args: { location: 'Boston' }, id: 'call_1' },
    //   { name: 'get_time', args: { location: 'Tokyo' }, id: 'call_2' }
    // ]


    // Execute all tools (can be done in parallel with async)
    const results = []
    for (const tool_call of response.tool_calls || []) {
        if (tool_call.name === 'get_weather') {
            const result = await get_weather.invoke(tool_call)
            results.push(result)
        }
    }
    ```

    The model intelligently determines when parallel execution is appropriate based on the independence of the requested operations.

    <Tip>
      Most models supporting tool calling enable parallel tool calls by default. Some (including [OpenAI](/oss/javascript/integrations/chat/openai) and [Anthropic](/oss/javascript/integrations/chat/anthropic)) allow you to disable this feature. To do this, set `parallel_tool_calls=False`:

      ```python  theme={null}
      model.bind_tools([get_weather], parallel_tool_calls=False)
      ```
    </Tip>
  </Accordion>

  <Accordion title="Streaming tool calls" icon="rss">
    When streaming responses, tool calls are progressively built through [`ToolCallChunk`](https://reference.langchain.com/javascript/classes/_langchain_core.messages.ToolCallChunk.html). This allows you to see tool calls as they're being generated rather than waiting for the complete response.

    ```typescript Streaming tool calls theme={null}
    const stream = await modelWithTools.stream(
        "What's the weather in Boston and Tokyo?"
    )
    for await (const chunk of stream) {
        // Tool call chunks arrive progressively
        if (chunk.tool_call_chunks) {
            for (const tool_chunk of chunk.tool_call_chunks) {
            console.log(`Tool: ${tool_chunk.get('name', '')}`)
            console.log(`Args: ${tool_chunk.get('args', '')}`)
            }
        }
    }

    // Output:
    // Tool: get_weather
    // Args:
    // Tool:
    // Args: {"loc
    // Tool:
    // Args: ation": "BOS"}
    // Tool: get_time
    // Args:
    // Tool:
    // Args: {"timezone": "Tokyo"}
    ```

    You can accumulate chunks to build complete tool calls:

    ```typescript Accumulate tool calls theme={null}
    let full: AIMessageChunk | null = null
    const stream = await modelWithTools.stream("What's the weather in Boston?")
    for await (const chunk of stream) {
        full = full ? full.concat(chunk) : chunk
        console.log(full.contentBlocks)
    }
    ```
  </Accordion>
</AccordionGroup>

***

## Structured output

Models can be requested to provide their response in a format matching a given schema. This is useful for ensuring the output can be easily parsed and used in subsequent processing. LangChain supports multiple schema types and methods for enforcing structured output.

<Tip>
  To learn about structured output, see [Structured output](/oss/javascript/langchain/structured-output).
</Tip>

<Tabs>
  <Tab title="Zod">
    A [zod schema](https://zod.dev/) is the preferred method of defining an output schema. Note that when a zod schema is provided, the model output will also be validated against the schema using zod's parse methods.

    ```typescript  theme={null}
    import * as z from "zod";

    const Movie = z.object({
      title: z.string().describe("The title of the movie"),
      year: z.number().describe("The year the movie was released"),
      director: z.string().describe("The director of the movie"),
      rating: z.number().describe("The movie's rating out of 10"),
    });

    const modelWithStructure = model.withStructuredOutput(Movie);

    const response = await modelWithStructure.invoke("Provide details about the movie Inception");
    console.log(response);
    // {
    //   title: "Inception",
    //   year: 2010,
    //   director: "Christopher Nolan",
    //   rating: 8.8,
    // }
    ```
  </Tab>

  <Tab title="JSON Schema">
    For maximum control or interoperability, you can provide a raw JSON Schema.

    ```typescript  theme={null}
    const jsonSchema = {
      "title": "Movie",
      "description": "A movie with details",
      "type": "object",
      "properties": {
        "title": {
          "type": "string",
          "description": "The title of the movie",
        },
        "year": {
          "type": "integer",
          "description": "The year the movie was released",
        },
        "director": {
          "type": "string",
          "description": "The director of the movie",
        },
        "rating": {
          "type": "number",
          "description": "The movie's rating out of 10",
        },
      },
      "required": ["title", "year", "director", "rating"],
    }

    const modelWithStructure = model.withStructuredOutput(
      jsonSchema,
      { method: "jsonSchema" },
    )

    const response = await modelWithStructure.invoke("Provide details about the movie Inception")
    console.log(response)  // {'title': 'Inception', 'year': 2010, ...}
    ```
  </Tab>
</Tabs>

<Note>
  **Key considerations for structured output:**

  * **Method parameter**: Some providers support different methods (`'jsonSchema'`, `'functionCalling'`, `'jsonMode'`)
  * **Include raw**: Use [`includeRaw: true`](https://reference.langchain.com/javascript/classes/_langchain_core.language_models_chat_models.BaseChatModel.html#withStructuredOutput) to get both the parsed output and the raw [`AIMessage`](https://reference.langchain.com/javascript/classes/_langchain_core.messages.AIMessage.html)
  * **Validation**: Zod models provide automatic validation, while JSON Schema requires manual validation

  See your [provider's integration page](/oss/javascript/integrations/providers/overview) for supported methods and configuration options.
</Note>

<Accordion title="Example: Message output alongside parsed structure">
  It can be useful to return the raw [`AIMessage`](https://reference.langchain.com/javascript/classes/_langchain_core.messages.AIMessage.html) object alongside the parsed representation to access response metadata such as [token counts](#token-usage). To do this, set [`include_raw=True`](https://reference.langchain.com/javascript/classes/_langchain_core.language_models_chat_models.BaseChatModel.html#withStructuredOutput) when calling [`with_structured_output`](https://reference.langchain.com/javascript/classes/_langchain_core.language_models_chat_models.BaseChatModel.html#withStructuredOutput):

  ```typescript  theme={null}
  import * as z from "zod";

  const Movie = z.object({
    title: z.string().describe("The title of the movie"),
    year: z.number().describe("The year the movie was released"),
    director: z.string().describe("The director of the movie"),
    rating: z.number().describe("The movie's rating out of 10"),
    title: z.string().describe("The title of the movie"),
    year: z.number().describe("The year the movie was released"),
    director: z.string().describe("The director of the movie"),  // [!code highlight]
    rating: z.number().describe("The movie's rating out of 10"),
  });

  const modelWithStructure = model.withStructuredOutput(Movie, { includeRaw: true });

  const response = await modelWithStructure.invoke("Provide details about the movie Inception");
  console.log(response);
  // {
  //   raw: AIMessage { ... },
  //   parsed: { title: "Inception", ... }
  // }
  ```
</Accordion>

<Accordion title="Example: Nested structures">
  Schemas can be nested:

  ```typescript  theme={null}
  import * as z from "zod";

  const Actor = z.object({
    name: str
    role: z.string(),
  });

  const MovieDetails = z.object({
    title: z.string(),
    year: z.number(),
    cast: z.array(Actor),
    genres: z.array(z.string()),
    budget: z.number().nullable().describe("Budget in millions USD"),
  });

  const modelWithStructure = model.withStructuredOutput(MovieDetails);
  ```
</Accordion>

***

## Advanced topics

### Model profiles

<Info>
  Model profiles require `langchain>=1.1`.
</Info>

LangChain chat models can expose a dictionary of supported features and capabilities through a `.profile` property:

```typescript  theme={null}
model.profile;
// {
//   maxInputTokens: 400000,
//   imageInputs: true,
//   reasoningOutput: true,
//   toolCalling: true,
//   ...
// }
```

Refer to the full set of fields in the [API reference](https://reference.langchain.com/javascript/interfaces/_langchain_core.language_models_profile.ModelProfile.html).

Much of the model profile data is powered by the [models.dev](https://github.com/sst/models.dev) project, an open source initiative that provides model capability data. This data is augmented with additional fields for purposes of use with LangChain. These augmentations are kept aligned with the upstream project as it evolves.

Model profile data allow applications to work around model capabilities dynamically. For example:

1. [Summarization middleware](/oss/javascript/langchain/middleware/built-in#summarization) can trigger summarization based on a model's context window size.
2. [Structured output](/oss/javascript/langchain/structured-output) strategies in `createAgent` can be inferred automatically (e.g., by checking support for native structured output features).
3. Model inputs can be gated based on supported [modalities](#multimodal) and maximum input tokens.

<Accordion title="Modify profile data">
  Model profile data can be changed if it is missing, stale, or incorrect.

  **Option 1 (quick fix)**

  You can instantiate a chat model with any valid profile:

  ```typescript  theme={null}
  const customProfile = {
  maxInputTokens: 100_000,
  toolCalling: true,
  structuredOutput: true,
  // ...
  };
  const model = initChatModel("...", { profile: customProfile });
  ```

  **Option 2 (fix data upstream)**

  The primary source for the data is the [models.dev](https://models.dev/) project. These data are merged with additional fields and overrides in LangChain [integration packages](/oss/javascript/integrations/providers/overview) and are shipped with those packages.

  Model profile data can be updated through the following process:

  1. (If needed) update the source data at [models.dev](https://models.dev/) through a pull request to its [repository on GitHub](https://github.com/sst/models.dev).
  2. (If needed) update additional fields and overrides in `langchain-<package>/profiles.toml` through a pull request to the LangChain [integration package](/oss/javascript/integrations/providers/overview).
</Accordion>

<Warning>
  Model profiles are a beta feature. The format of a profile is subject to change.
</Warning>

### Multimodal

Certain models can process and return non-textual data such as images, audio, and video. You can pass non-textual data to a model by providing [content blocks](/oss/javascript/langchain/messages#message-content).

<Tip>
  All LangChain chat models with underlying multimodal capabilities support:

  1. Data in the cross-provider standard format (see [our messages guide](/oss/javascript/langchain/messages))
  2. OpenAI [chat completions](https://platform.openai.com/docs/api-reference/chat) format
  3. Any format that is native to that specific provider (e.g., Anthropic models accept Anthropic native format)
</Tip>

See the [multimodal section](/oss/javascript/langchain/messages#multimodal) of the messages guide for details.

<Tooltip tip="Not all LLMs are made equally!" cta="See reference" href="https://models.dev/">Some models</Tooltip> can return multimodal data as part of their response. If invoked to do so, the resulting [`AIMessage`](https://reference.langchain.com/javascript/classes/_langchain_core.messages.AIMessage.html) will have content blocks with multimodal types.

```typescript Multimodal output theme={null}
const response = await model.invoke("Create a picture of a cat");
console.log(response.contentBlocks);
// [
//   { type: "text", text: "Here's a picture of a cat" },
//   { type: "image", data: "...", mimeType: "image/jpeg" },
// ]
```

See the [integrations page](/oss/javascript/integrations/providers/overview) for details on specific providers.

### Reasoning

Many models are capable of performing multi-step reasoning to arrive at a conclusion. This involves breaking down complex problems into smaller, more manageable steps.

**If supported by the underlying model,** you can surface this reasoning process to better understand how the model arrived at its final answer.

<CodeGroup>
  ```typescript Stream reasoning output theme={null}
  const stream = model.stream("Why do parrots have colorful feathers?");
  for await (const chunk of stream) {
      const reasoningSteps = chunk.contentBlocks.filter(b => b.type === "reasoning");
      console.log(reasoningSteps.length > 0 ? reasoningSteps : chunk.text);
  }
  ```

  ```typescript Complete reasoning output theme={null}
  const response = await model.invoke("Why do parrots have colorful feathers?");
  const reasoningSteps = response.contentBlocks.filter(b => b.type === "reasoning");
  console.log(reasoningSteps.map(step => step.reasoning).join(" "));
  ```
</CodeGroup>

Depending on the model, you can sometimes specify the level of effort it should put into reasoning. Similarly, you can request that the model turn off reasoning entirely. This may take the form of categorical "tiers" of reasoning (e.g., `'low'` or `'high'`) or integer token budgets.

For details, see the [integrations page](/oss/javascript/integrations/providers/overview) or [reference](https://reference.langchain.com/python/integrations/) for your respective chat model.

### Local models

LangChain supports running models locally on your own hardware. This is useful for scenarios where either data privacy is critical, you want to invoke a custom model, or when you want to avoid the costs incurred when using a cloud-based model.

[Ollama](/oss/javascript/integrations/chat/ollama) is one of the easiest ways to run chat and embedding models locally.

### Prompt caching

Many providers offer prompt caching features to reduce latency and cost on repeat processing of the same tokens. These features can be **implicit** or **explicit**:

* **Implicit prompt caching:** providers will automatically pass on cost savings if a request hits a cache. Examples: [OpenAI](/oss/javascript/integrations/chat/openai) and [Gemini](/oss/javascript/integrations/chat/google_generative_ai).
* **Explicit caching:** providers allow you to manually indicate cache points for greater control or to guarantee cost savings. Examples:
  * [`ChatOpenAI`](https://reference.langchain.com/javascript/classes/_langchain_openai.ChatOpenAI.html) (via `prompt_cache_key`)
  * Anthropic's [`AnthropicPromptCachingMiddleware`](/oss/javascript/integrations/chat/anthropic#prompt-caching)
  * [Gemini](https://reference.langchain.com/python/integrations/langchain_google_genai/).
  * [AWS Bedrock](/oss/javascript/integrations/chat/bedrock#prompt-caching)

<Warning>
  Prompt caching is often only engaged above a minimum input token threshold. See [provider pages](/oss/javascript/integrations/chat) for details.
</Warning>

Cache usage will be reflected in the [usage metadata](/oss/javascript/langchain/messages#token-usage) of the model response.

### Server-side tool use

Some providers support server-side [tool-calling](#tool-calling) loops: models can interact with web search, code interpreters, and other tools and analyze the results in a single conversational turn.

If a model invokes a tool server-side, the content of the response message will include content representing the invocation and result of the tool. Accessing the [content blocks](/oss/javascript/langchain/messages#standard-content-blocks) of the response will return the server-side tool calls and results in a provider-agnostic format:

```typescript  theme={null}
import { initChatModel } from "langchain";

const model = await initChatModel("gpt-4.1-mini");
const modelWithTools = model.bindTools([{ type: "web_search" }])

const message = await modelWithTools.invoke("What was a positive news story from today?");
console.log(message.contentBlocks);
```

This represents a single conversational turn; there are no associated [ToolMessage](/oss/javascript/langchain/messages#tool-message) objects that need to be passed in as in client-side [tool-calling](#tool-calling).

See the [integration page](/oss/javascript/integrations/chat) for your given provider for available tools and usage details.

### Base URL or proxy

For many chat model integrations, you can configure the base URL for API requests, which allows you to use model providers that have OpenAI-compatible APIs or to use a proxy server.

<Accordion title="Base URL" icon="link">
  Many model providers offer OpenAI-compatible APIs (e.g., [Together AI](https://www.together.ai/), [vLLM](https://github.com/vllm-project/vllm)). You can use `initChatModel` with these providers by specifying the appropriate `base_url` parameter:

  ```python  theme={null}
  model = initChatModel(
      "MODEL_NAME",
      {
          modelProvider: "openai",
          baseUrl: "BASE_URL",
          apiKey: "YOUR_API_KEY",
      }
  )
  ```

  <Note>
    When using direct chat model class instantiation, the parameter name may vary by provider. Check the respective [reference](/oss/javascript/integrations/providers/overview) for details.
  </Note>
</Accordion>

### Log probabilities

Certain models can be configured to return token-level log probabilities representing the likelihood of a given token by setting the `logprobs` parameter when initializing the model:

```typescript  theme={null}
const model = new ChatOpenAI({
    model: "gpt-4o",
    logprobs: true,
});

const responseMessage = await model.invoke("Why do parrots talk?");

responseMessage.response_metadata.logprobs.content.slice(0, 5);
```

### Token usage

A number of model providers return token usage information as part of the invocation response. When available, this information will be included on the [`AIMessage`](https://reference.langchain.com/javascript/classes/_langchain_core.messages.AIMessage.html) objects produced by the corresponding model. For more details, see the [messages](/oss/javascript/langchain/messages) guide.

<Note>
  Some provider APIs, notably OpenAI and Azure OpenAI chat completions, require users opt-in to receiving token usage data in streaming contexts. See the [streaming usage metadata](/oss/javascript/integrations/chat/openai#streaming-usage-metadata) section of the integration guide for details.
</Note>

### Invocation config

When invoking a model, you can pass additional configuration through the `config` parameter using a [`RunnableConfig`](https://reference.langchain.com/javascript/interfaces/_langchain_core.runnables.RunnableConfig.html) object. This provides run-time control over execution behavior, callbacks, and metadata tracking.

Common configuration options include:

```typescript Invocation with config theme={null}
const response = await model.invoke(
    "Tell me a joke",
    {
        runName: "joke_generation",      // Custom name for this run
        tags: ["humor", "demo"],          // Tags for categorization
        metadata: {"user_id": "123"},     // Custom metadata
        callbacks: [my_callback_handler], // Callback handlers
    }
)
```

These configuration values are particularly useful when:

* Debugging with [LangSmith](https://docs.langchain.com/langsmith/home) tracing
* Implementing custom logging or monitoring
* Controlling resource usage in production
* Tracking invocations across complex pipelines

<Accordion title="Key configuration attributes">
  <ParamField body="runName" type="string">
    Identifies this specific invocation in logs and traces. Not inherited by sub-calls.
  </ParamField>

  <ParamField body="tags" type="string[]">
    Labels inherited by all sub-calls for filtering and organization in debugging tools.
  </ParamField>

  <ParamField body="metadata" type="object">
    Custom key-value pairs for tracking additional context, inherited by all sub-calls.
  </ParamField>

  <ParamField body="maxConcurrency" type="number">
    Controls the maximum number of parallel calls when using `batch()`.
  </ParamField>

  <ParamField body="callbacks" type="CallbackHandler[]">
    Handlers for monitoring and responding to events during execution.
  </ParamField>

  <ParamField body="recursion_limit" type="number">
    Maximum recursion depth for chains to prevent infinite loops in complex pipelines.
  </ParamField>
</Accordion>

<Tip>
  See full [`RunnableConfig`](https://reference.langchain.com/javascript/interfaces/_langchain_core.runnables.RunnableConfig.html) reference for all supported attributes.
</Tip>

***

<Callout icon="pen-to-square" iconType="regular">
  [Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/oss/langchain/models.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).
</Callout>

<Tip icon="terminal" iconType="regular">
  [Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.
</Tip>

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.langchain.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Models

[LLMs](https://en.wikipedia.org/wiki/Large_language_model) are powerful AI tools that can interpret and generate text like humans. They're versatile enough to write content, translate languages, summarize, and answer questions without needing specialized training for each task.

In addition to text generation, many models support:

* <Icon icon="hammer" size={16} /> [Tool calling](#tool-calling) - calling external tools (like databases queries or API calls) and use results in their responses.
* <Icon icon="shapes" size={16} /> [Structured output](#structured-output) - where the model's response is constrained to follow a defined format.
* <Icon icon="image" size={16} /> [Multimodality](#multimodal) - process and return data other than text, such as images, audio, and video.
* <Icon icon="brain" size={16} /> [Reasoning](#reasoning) - models perform multi-step reasoning to arrive at a conclusion.

Models are the reasoning engine of [agents](/oss/javascript/langchain/agents). They drive the agent's decision-making process, determining which tools to call, how to interpret results, and when to provide a final answer.

The quality and capabilities of the model you choose directly impact your agent's baseline reliability and performance. Different models excel at different tasks - some are better at following complex instructions, others at structured reasoning, and some support larger context windows for handling more information.

LangChain's standard model interfaces give you access to many different provider integrations, which makes it easy to experiment with and switch between models to find the best fit for your use case.

<Info>
  For provider-specific integration information and capabilities, see the provider's [chat model page](/oss/javascript/integrations/chat).
</Info>

## Basic usage

Models can be utilized in two ways:

1. **With agents** - Models can be dynamically specified when creating an [agent](/oss/javascript/langchain/agents#model).
2. **Standalone** - Models can be called directly (outside of the agent loop) for tasks like text generation, classification, or extraction without the need for an agent framework.

The same model interface works in both contexts, which gives you the flexibility to start simple and scale up to more complex agent-based workflows as needed.

### Initialize a model

The easiest way to get started with a standalone model in LangChain is to use `initChatModel` to initialize one from a [chat model provider](/oss/javascript/integrations/chat) of your choice (examples below):

<Tabs>
  <Tab title="OpenAI">
    👉 Read the [OpenAI chat model integration docs](/oss/javascript/integrations/chat/openai/)

    <CodeGroup>
      ```bash npm theme={null}
      npm install @langchain/openai
      ```

      ```bash pnpm theme={null}
      pnpm install @langchain/openai
      ```

      ```bash yarn theme={null}
      yarn add @langchain/openai
      ```

      ```bash bun theme={null}
      bun add @langchain/openai
      ```
    </CodeGroup>

    <CodeGroup>
      ```typescript initChatModel theme={null}
      import { initChatModel } from "langchain";

      process.env.OPENAI_API_KEY = "your-api-key";

      const model = await initChatModel("gpt-4.1");
      ```

      ```typescript Model Class theme={null}
      import { ChatOpenAI } from "@langchain/openai";

      const model = new ChatOpenAI({
        model: "gpt-4.1",
        apiKey: "your-api-key"
      });
      ```
    </CodeGroup>
  </Tab>

  <Tab title="Anthropic">
    👉 Read the [Anthropic chat model integration docs](/oss/javascript/integrations/chat/anthropic/)

    <CodeGroup>
      ```bash npm theme={null}
      npm install @langchain/anthropic
      ```

      ```bash pnpm theme={null}
      pnpm install @langchain/anthropic
      ```

      ```bash yarn theme={null}
      yarn add @langchain/anthropic
      ```

      ```bash pnpm theme={null}
      pnpm add @langchain/anthropic
      ```
    </CodeGroup>

    <CodeGroup>
      ```typescript initChatModel theme={null}
      import { initChatModel } from "langchain";

      process.env.ANTHROPIC_API_KEY = "your-api-key";

      const model = await initChatModel("claude-sonnet-4-5-20250929");
      ```

      ```typescript Model Class theme={null}
      import { ChatAnthropic } from "@langchain/anthropic";

      const model = new ChatAnthropic({
        model: "claude-sonnet-4-5-20250929",
        apiKey: "your-api-key"
      });
      ```
    </CodeGroup>
  </Tab>

  <Tab title="Azure">
    👉 Read the [Azure chat model integration docs](/oss/javascript/integrations/chat/azure/)

    <CodeGroup>
      ```bash npm theme={null}
      npm install @langchain/azure
      ```

      ```bash pnpm theme={null}
      pnpm install @langchain/azure
      ```

      ```bash yarn theme={null}
      yarn add @langchain/azure
      ```

      ```bash bun theme={null}
      bun add @langchain/azure
      ```
    </CodeGroup>

    <CodeGroup>
      ```typescript initChatModel theme={null}
      import { initChatModel } from "langchain";

      process.env.AZURE_OPENAI_API_KEY = "your-api-key";
      process.env.AZURE_OPENAI_ENDPOINT = "your-endpoint";
      process.env.OPENAI_API_VERSION = "your-api-version";

      const model = await initChatModel("azure_openai:gpt-4.1");
      ```

      ```typescript Model Class theme={null}
      import { AzureChatOpenAI } from "@langchain/openai";

      const model = new AzureChatOpenAI({
        model: "gpt-4.1",
        azureOpenAIApiKey: "your-api-key",
        azureOpenAIApiEndpoint: "your-endpoint",
        azureOpenAIApiVersion: "your-api-version"
      });
      ```
    </CodeGroup>
  </Tab>

  <Tab title="Google Gemini">
    👉 Read the [Google GenAI chat model integration docs](/oss/javascript/integrations/chat/google_generative_ai/)

    <CodeGroup>
      ```bash npm theme={null}
      npm install @langchain/google-genai
      ```

      ```bash pnpm theme={null}
      pnpm install @langchain/google-genai
      ```

      ```bash yarn theme={null}
      yarn add @langchain/google-genai
      ```

      ```bash bun theme={null}
      bun add @langchain/google-genai
      ```
    </CodeGroup>

    <CodeGroup>
      ```typescript initChatModel theme={null}
      import { initChatModel } from "langchain";

      process.env.GOOGLE_API_KEY = "your-api-key";

      const model = await initChatModel("google-genai:gemini-2.5-flash-lite");
      ```

      ```typescript Model Class theme={null}
      import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

      const model = new ChatGoogleGenerativeAI({
        model: "gemini-2.5-flash-lite",
        apiKey: "your-api-key"
      });
      ```
    </CodeGroup>
  </Tab>

  <Tab title="Bedrock Converse">
    👉 Read the [AWS Bedrock chat model integration docs](/oss/javascript/integrations/chat/bedrock_converse/)

    <CodeGroup>
      ```bash npm theme={null}
      npm install @langchain/aws
      ```

      ```bash pnpm theme={null}
      pnpm install @langchain/aws
      ```

      ```bash yarn theme={null}
      yarn add @langchain/aws
      ```

      ```bash bun theme={null}
      bun add @langchain/aws
      ```
    </CodeGroup>

    <CodeGroup>
      ```typescript initChatModel theme={null}
      import { initChatModel } from "langchain";

      // Follow the steps here to configure your credentials:
      // https://docs.aws.amazon.com/bedrock/latest/userguide/getting-started.html

      const model = await initChatModel("bedrock:gpt-4.1");
      ```

      ```typescript Model Class theme={null}
      import { ChatBedrockConverse } from "@langchain/aws";

      // Follow the steps here to configure your credentials:
      // https://docs.aws.amazon.com/bedrock/latest/userguide/getting-started.html

      const model = new ChatBedrockConverse({
        model: "gpt-4.1",
        region: "us-east-2"
      });
      ```
    </CodeGroup>
  </Tab>
</Tabs>

```typescript  theme={null}
const response = await model.invoke("Why do parrots talk?");
```

See [`initChatModel`](https://reference.langchain.com/javascript/functions/langchain.chat_models_universal.initChatModel.html) for more detail, including information on how to pass model [parameters](#parameters).

### Supported models

LangChain supports all major model providers, including OpenAI, Anthropic, Google, Azure, AWS Bedrock, and more. Each provider offers a variety of models with different capabilities. For a full list of supported models in LangChain, see the [integrations page](/oss/javascript/integrations/providers/overview).

### Key methods

<Card title="Invoke" href="#invoke" icon="paper-plane" arrow="true" horizontal>
  The model takes messages as input and outputs messages after generating a complete response.
</Card>

<Card title="Stream" href="#stream" icon="tower-broadcast" arrow="true" horizontal>
  Invoke the model, but stream the output as it is generated in real-time.
</Card>

<Card title="Batch" href="#batch" icon="grip" arrow="true" horizontal>
  Send multiple requests to a model in a batch for more efficient processing.
</Card>

<Info>
  In addition to chat models, LangChain provides support for other adjacent technologies, such as embedding models and vector stores. See the [integrations page](/oss/javascript/integrations/providers/overview) for details.
</Info>

## Parameters

A chat model takes parameters that can be used to configure its behavior. The full set of supported parameters varies by model and provider, but standard ones include:

<ParamField body="model" type="string" required>
  The name or identifier of the specific model you want to use with a provider. You can also specify both the model and its provider in a single argument using the '{model_provider}:{model}' format, for example, 'openai:o1'.
</ParamField>

<ParamField body="apiKey" type="string">
  The key required for authenticating with the model's provider. This is usually issued when you sign up for access to the model. Often accessed by setting an <Tooltip tip="A variable whose value is set outside the program, typically through functionality built into the operating system or microservice.">environment variable</Tooltip>.
</ParamField>

<ParamField body="temperature" type="number">
  Controls the randomness of the model's output. A higher number makes responses more creative; lower ones make them more deterministic.
</ParamField>

<ParamField body="maxTokens" type="number">
  Limits the total number of <Tooltip tip="The basic unit that a model reads and generates. Providers may define them differently, but in general, they can represent a whole or part of word.">tokens</Tooltip> in the response, effectively controlling how long the output can be.
</ParamField>

<ParamField body="timeout" type="number">
  The maximum time (in seconds) to wait for a response from the model before canceling the request.
</ParamField>

<ParamField body="maxRetries" type="number">
  The maximum number of attempts the system will make to resend a request if it fails due to issues like network timeouts or rate limits.
</ParamField>

Using `initChatModel`, pass these parameters as inline parameters:

```typescript Initialize using model parameters theme={null}
const model = await initChatModel(
    "claude-sonnet-4-5-20250929",
    { temperature: 0.7, timeout: 30, max_tokens: 1000 }
)
```

<Info>
  Each chat model integration may have additional params used to control provider-specific functionality.

  For example, [`ChatOpenAI`](https://reference.langchain.com/javascript/classes/_langchain_openai.ChatOpenAI.html) has `use_responses_api` to dictate whether to use the OpenAI Responses or Completions API.

  To find all the parameters supported by a given chat model, head to the [chat model integrations](/oss/javascript/integrations/chat) page.
</Info>

***

## Invocation

A chat model must be invoked to generate an output. There are three primary invocation methods, each suited to different use cases.

### Invoke

The most straightforward way to call a model is to use [`invoke()`](https://reference.langchain.com/javascript/classes/_langchain_core.language_models_chat_models.BaseChatModel.html#invoke) with a single message or a list of messages.

```typescript Single message theme={null}
const response = await model.invoke("Why do parrots have colorful feathers?");
console.log(response);
```

A list of messages can be provided to a chat model to represent conversation history. Each message has a role that models use to indicate who sent the message in the conversation.

See the [messages](/oss/javascript/langchain/messages) guide for more detail on roles, types, and content.

```typescript Object format theme={null}
const conversation = [
  { role: "system", content: "You are a helpful assistant that translates English to French." },
  { role: "user", content: "Translate: I love programming." },
  { role: "assistant", content: "J'adore la programmation." },
  { role: "user", content: "Translate: I love building applications." },
];

const response = await model.invoke(conversation);
console.log(response);  // AIMessage("J'adore créer des applications.")
```

```typescript Message objects theme={null}
import { HumanMessage, AIMessage, SystemMessage } from "langchain";

const conversation = [
  new SystemMessage("You are a helpful assistant that translates English to French."),
  new HumanMessage("Translate: I love programming."),
  new AIMessage("J'adore la programmation."),
  new HumanMessage("Translate: I love building applications."),
];

const response = await model.invoke(conversation);
console.log(response);  // AIMessage("J'adore créer des applications.")
```

<Info>
  If the return type of your invocation is a string, ensure that you are using a chat model as opposed to a LLM. Legacy, text-completion LLMs return strings directly. LangChain chat models are prefixed with "Chat", e.g., [`ChatOpenAI`](https://reference.langchain.com/javascript/classes/_langchain_openai.ChatOpenAI.html)(/oss/integrations/chat/openai).
</Info>

### Stream

Most models can stream their output content while it is being generated. By displaying output progressively, streaming significantly improves user experience, particularly for longer responses.

Calling [`stream()`](https://reference.langchain.com/javascript/classes/_langchain_core.language_models_chat_models.BaseChatModel.html#stream) returns an <Tooltip tip="An object that progressively provides access to each item of a collection, in order.">iterator</Tooltip> that yields output chunks as they are produced. You can use a loop to process each chunk in real-time:

<CodeGroup>
  ```typescript Basic text streaming theme={null}
  const stream = await model.stream("Why do parrots have colorful feathers?");
  for await (const chunk of stream) {
    console.log(chunk.text)
  }
  ```

  ```typescript Stream tool calls, reasoning, and other content theme={null}
  const stream = await model.stream("What color is the sky?");
  for await (const chunk of stream) {
    for (const block of chunk.contentBlocks) {
      if (block.type === "reasoning") {
        console.log(`Reasoning: ${block.reasoning}`);
      } else if (block.type === "tool_call_chunk") {
        console.log(`Tool call chunk: ${block}`);
      } else if (block.type === "text") {
        console.log(block.text);
      } else {
        ...
      }
    }
  }
  ```
</CodeGroup>

As opposed to [`invoke()`](#invoke), which returns a single [`AIMessage`](https://reference.langchain.com/javascript/classes/_langchain_core.messages.AIMessage.html) after the model has finished generating its full response, `stream()` returns multiple [`AIMessageChunk`](https://reference.langchain.com/javascript/classes/_langchain_core.messages.AIMessageChunk.html) objects, each containing a portion of the output text. Importantly, each chunk in a stream is designed to be gathered into a full message via summation:

```typescript Construct AIMessage theme={null}
let full: AIMessageChunk | null = null;
for await (const chunk of stream) {
  full = full ? full.concat(chunk) : chunk;
  console.log(full.text);
}

// The
// The sky
// The sky is
// The sky is typically
// The sky is typically blue
// ...

console.log(full.contentBlocks);
// [{"type": "text", "text": "The sky is typically blue..."}]
```

The resulting message can be treated the same as a message that was generated with [`invoke()`](#invoke) – for example, it can be aggregated into a message history and passed back to the model as conversational context.

<Warning>
  Streaming only works if all steps in the program know how to process a stream of chunks. For instance, an application that isn't streaming-capable would be one that needs to store the entire output in memory before it can be processed.
</Warning>

<Accordion title="Advanced streaming topics">
  <Accordion title="Streaming events">
    LangChain chat models can also stream semantic events using
    \[`streamEvents()`]\[BaseChatModel.streamEvents].

    This simplifies filtering based on event types and other metadata, and will aggregate the full message in the background. See below for an example.

    ```typescript  theme={null}
    const stream = await model.streamEvents("Hello");
    for await (const event of stream) {
        if (event.event === "on_chat_model_start") {
            console.log(`Input: ${event.data.input}`);
        }
        if (event.event === "on_chat_model_stream") {
            console.log(`Token: ${event.data.chunk.text}`);
        }
        if (event.event === "on_chat_model_end") {
            console.log(`Full message: ${event.data.output.text}`);
        }
    }
    ```

    ```txt  theme={null}
    Input: Hello
    Token: Hi
    Token:  there
    Token: !
    Token:  How
    Token:  can
    Token:  I
    ...
    Full message: Hi there! How can I help today?
    ```

    See the [`streamEvents()`](https://reference.langchain.com/javascript/classes/_langchain_core.language_models_chat_models.BaseChatModel.html#streamEvents) reference for event types and other details.
  </Accordion>

  <Accordion title="&#x22;Auto-streaming&#x22; chat models">
    LangChain simplifies streaming from chat models by automatically enabling streaming mode in certain cases, even when you're not explicitly calling the streaming methods. This is particularly useful when you use the non-streaming invoke method but still want to stream the entire application, including intermediate results from the chat model.

    In [LangGraph agents](/oss/javascript/langchain/agents), for example, you can call `model.invoke()` within nodes, but LangChain will automatically delegate to streaming if running in a streaming mode.

    #### How it works

    When you `invoke()` a chat model, LangChain will automatically switch to an internal streaming mode if it detects that you are trying to stream the overall application. The result of the invocation will be the same as far as the code that was using invoke is concerned; however, while the chat model is being streamed, LangChain will take care of invoking [`on_llm_new_token`](https://reference.langchain.com/javascript/interfaces/_langchain_core.callbacks_base.BaseCallbackHandlerMethods.html#onLlmNewToken) events in LangChain's callback system.

    Callback events allow LangGraph `stream()` and `streamEvents()` to surface the chat model's output in real-time.
  </Accordion>
</Accordion>

### Batch

Batching a collection of independent requests to a model can significantly improve performance and reduce costs, as the processing can be done in parallel:

```typescript Batch theme={null}
const responses = await model.batch([
  "Why do parrots have colorful feathers?",
  "How do airplanes fly?",
  "What is quantum computing?",
  "Why do parrots have colorful feathers?",
  "How do airplanes fly?",
  "What is quantum computing?",
]);
for (const response of responses) {
  console.log(response);
}
```

<Tip>
  When processing a large number of inputs using `batch()`, you may want to control the maximum number of parallel calls. This can be done by setting the `maxConcurrency` attribute in the [`RunnableConfig`](https://reference.langchain.com/javascript/interfaces/_langchain_core.runnables.RunnableConfig.html) dictionary.

  ```typescript Batch with max concurrency theme={null}
  model.batch(
    listOfInputs,
    {
      maxConcurrency: 5,  // Limit to 5 parallel calls
    }
  )
  ```

  See the [`RunnableConfig`](https://reference.langchain.com/javascript/interfaces/_langchain_core.runnables.RunnableConfig.html) reference for a full list of supported attributes.
</Tip>

For more details on batching, see the [reference](https://reference.langchain.com/javascript/classes/_langchain_core.language_models_chat_models.BaseChatModel.html#batch).

***

## Tool calling

Models can request to call tools that perform tasks such as fetching data from a database, searching the web, or running code. Tools are pairings of:

1. A schema, including the name of the tool, a description, and/or argument definitions (often a JSON schema)
2. A function or <Tooltip tip="A method that can suspend execution and resume at a later time">coroutine</Tooltip> to execute.

<Note>
  You may hear the term "function calling". We use this interchangeably with "tool calling".
</Note>

Here's the basic tool calling flow between a user and a model:

```mermaid  theme={null}
sequenceDiagram
    participant U as User
    participant M as Model
    participant T as Tools

    U->>M: "What's the weather in SF and NYC?"
    M->>M: Analyze request & decide tools needed

    par Parallel Tool Calls
        M->>T: getWeather("San Francisco")
        M->>T: getWeather("New York")
    end

    par Tool Execution
        T-->>M: SF weather data
        T-->>M: NYC weather data
    end

    M->>M: Process results & generate response
    M->>U: "SF: 72°F sunny, NYC: 68°F cloudy"
```

To make tools that you have defined available for use by a model, you must bind them using [`bindTools`](https://reference.langchain.com/javascript/classes/_langchain_core.language_models_chat_models.BaseChatModel.html#bindTools). In subsequent invocations, the model can choose to call any of the bound tools as needed.

Some model providers offer <Tooltip tip="Tools that are executed server-side, such as web search and code interpreters">built-in tools</Tooltip> that can be enabled via model or invocation parameters (e.g. [`ChatOpenAI`](/oss/javascript/integrations/chat/openai), [`ChatAnthropic`](/oss/javascript/integrations/chat/anthropic)). Check the respective [provider reference](/oss/javascript/integrations/providers/overview) for details.

<Tip>
  See the [tools guide](/oss/javascript/langchain/tools) for details and other options for creating tools.
</Tip>

```typescript Binding user tools theme={null}
import { tool } from "langchain";
import * as z from "zod";
import { ChatOpenAI } from "@langchain/openai";

const getWeather = tool(
  (input) => `It's sunny in ${input.location}.`,
  {
    name: "get_weather",
    description: "Get the weather at a location.",
    schema: z.object({
      location: z.string().describe("The location to get the weather for"),
    }),
  },
);

const model = new ChatOpenAI({ model: "gpt-4o" });
const modelWithTools = model.bindTools([getWeather]);  // [!code highlight]

const response = await modelWithTools.invoke("What's the weather like in Boston?");
const toolCalls = response.tool_calls || [];
for (const tool_call of toolCalls) {
  // View tool calls made by the model
  console.log(`Tool: ${tool_call.name}`);
  console.log(`Args: ${tool_call.args}`);
}
```

When binding user-defined tools, the model's response includes a **request** to execute a tool. When using a model separately from an [agent](/oss/javascript/langchain/agents), it is up to you to execute the requested tool and return the result back to the model for use in subsequent reasoning. When using an [agent](/oss/javascript/langchain/agents), the agent loop will handle the tool execution loop for you.

Below, we show some common ways you can use tool calling.

<AccordionGroup>
  <Accordion title="Tool execution loop" icon="arrow-rotate-right">
    When a model returns tool calls, you need to execute the tools and pass the results back to the model. This creates a conversation loop where the model can use tool results to generate its final response. LangChain includes [agent](/oss/javascript/langchain/agents) abstractions that handle this orchestration for you.

    Here's a simple example of how to do this:

    ```typescript Tool execution loop theme={null}
    // Bind (potentially multiple) tools to the model
    const modelWithTools = model.bindTools([get_weather])

    // Step 1: Model generates tool calls
    const messages = [{"role": "user", "content": "What's the weather in Boston?"}]
    const ai_msg = await modelWithTools.invoke(messages)
    messages.push(ai_msg)

    // Step 2: Execute tools and collect results
    for (const tool_call of ai_msg.tool_calls) {
        // Execute the tool with the generated arguments
        const tool_result = await get_weather.invoke(tool_call)
        messages.push(tool_result)
    }

    // Step 3: Pass results back to model for final response
    const final_response = await modelWithTools.invoke(messages)
    console.log(final_response.text)
    // "The current weather in Boston is 72°F and sunny."
    ```

    Each [`ToolMessage`](https://reference.langchain.com/javascript/classes/_langchain_core.messages.ToolMessage.html) returned by the tool includes a `tool_call_id` that matches the original tool call, helping the model correlate results with requests.
  </Accordion>

  <Accordion title="Forcing tool calls" icon="asterisk">
    By default, the model has the freedom to choose which bound tool to use based on the user's input. However, you might want to force choosing a tool, ensuring the model uses either a particular tool or **any** tool from a given list:

    <CodeGroup>
      ```typescript Force use of any tool theme={null}
      const modelWithTools = model.bindTools([tool_1], { toolChoice: "any" })
      ```

      ```typescript Force use of specific tools theme={null}
      const modelWithTools = model.bindTools([tool_1], { toolChoice: "tool_1" })
      ```
    </CodeGroup>
  </Accordion>

  <Accordion title="Parallel tool calls" icon="layer-group">
    Many models support calling multiple tools in parallel when appropriate. This allows the model to gather information from different sources simultaneously.

    ```typescript Parallel tool calls theme={null}
    const modelWithTools = model.bind_tools([get_weather])

    const response = await modelWithTools.invoke(
        "What's the weather in Boston and Tokyo?"
    )


    // The model may generate multiple tool calls
    console.log(response.tool_calls)
    // [
    //   { name: 'get_weather', args: { location: 'Boston' }, id: 'call_1' },
    //   { name: 'get_time', args: { location: 'Tokyo' }, id: 'call_2' }
    // ]


    // Execute all tools (can be done in parallel with async)
    const results = []
    for (const tool_call of response.tool_calls || []) {
        if (tool_call.name === 'get_weather') {
            const result = await get_weather.invoke(tool_call)
            results.push(result)
        }
    }
    ```

    The model intelligently determines when parallel execution is appropriate based on the independence of the requested operations.

    <Tip>
      Most models supporting tool calling enable parallel tool calls by default. Some (including [OpenAI](/oss/javascript/integrations/chat/openai) and [Anthropic](/oss/javascript/integrations/chat/anthropic)) allow you to disable this feature. To do this, set `parallel_tool_calls=False`:

      ```python  theme={null}
      model.bind_tools([get_weather], parallel_tool_calls=False)
      ```
    </Tip>
  </Accordion>

  <Accordion title="Streaming tool calls" icon="rss">
    When streaming responses, tool calls are progressively built through [`ToolCallChunk`](https://reference.langchain.com/javascript/classes/_langchain_core.messages.ToolCallChunk.html). This allows you to see tool calls as they're being generated rather than waiting for the complete response.

    ```typescript Streaming tool calls theme={null}
    const stream = await modelWithTools.stream(
        "What's the weather in Boston and Tokyo?"
    )
    for await (const chunk of stream) {
        // Tool call chunks arrive progressively
        if (chunk.tool_call_chunks) {
            for (const tool_chunk of chunk.tool_call_chunks) {
            console.log(`Tool: ${tool_chunk.get('name', '')}`)
            console.log(`Args: ${tool_chunk.get('args', '')}`)
            }
        }
    }

    // Output:
    // Tool: get_weather
    // Args:
    // Tool:
    // Args: {"loc
    // Tool:
    // Args: ation": "BOS"}
    // Tool: get_time
    // Args:
    // Tool:
    // Args: {"timezone": "Tokyo"}
    ```

    You can accumulate chunks to build complete tool calls:

    ```typescript Accumulate tool calls theme={null}
    let full: AIMessageChunk | null = null
    const stream = await modelWithTools.stream("What's the weather in Boston?")
    for await (const chunk of stream) {
        full = full ? full.concat(chunk) : chunk
        console.log(full.contentBlocks)
    }
    ```
  </Accordion>
</AccordionGroup>

***

## Structured output

Models can be requested to provide their response in a format matching a given schema. This is useful for ensuring the output can be easily parsed and used in subsequent processing. LangChain supports multiple schema types and methods for enforcing structured output.

<Tip>
  To learn about structured output, see [Structured output](/oss/javascript/langchain/structured-output).
</Tip>

<Tabs>
  <Tab title="Zod">
    A [zod schema](https://zod.dev/) is the preferred method of defining an output schema. Note that when a zod schema is provided, the model output will also be validated against the schema using zod's parse methods.

    ```typescript  theme={null}
    import * as z from "zod";

    const Movie = z.object({
      title: z.string().describe("The title of the movie"),
      year: z.number().describe("The year the movie was released"),
      director: z.string().describe("The director of the movie"),
      rating: z.number().describe("The movie's rating out of 10"),
    });

    const modelWithStructure = model.withStructuredOutput(Movie);

    const response = await modelWithStructure.invoke("Provide details about the movie Inception");
    console.log(response);
    // {
    //   title: "Inception",
    //   year: 2010,
    //   director: "Christopher Nolan",
    //   rating: 8.8,
    // }
    ```
  </Tab>

  <Tab title="JSON Schema">
    For maximum control or interoperability, you can provide a raw JSON Schema.

    ```typescript  theme={null}
    const jsonSchema = {
      "title": "Movie",
      "description": "A movie with details",
      "type": "object",
      "properties": {
        "title": {
          "type": "string",
          "description": "The title of the movie",
        },
        "year": {
          "type": "integer",
          "description": "The year the movie was released",
        },
        "director": {
          "type": "string",
          "description": "The director of the movie",
        },
        "rating": {
          "type": "number",
          "description": "The movie's rating out of 10",
        },
      },
      "required": ["title", "year", "director", "rating"],
    }

    const modelWithStructure = model.withStructuredOutput(
      jsonSchema,
      { method: "jsonSchema" },
    )

    const response = await modelWithStructure.invoke("Provide details about the movie Inception")
    console.log(response)  // {'title': 'Inception', 'year': 2010, ...}
    ```
  </Tab>
</Tabs>

<Note>
  **Key considerations for structured output:**

  * **Method parameter**: Some providers support different methods (`'jsonSchema'`, `'functionCalling'`, `'jsonMode'`)
  * **Include raw**: Use [`includeRaw: true`](https://reference.langchain.com/javascript/classes/_langchain_core.language_models_chat_models.BaseChatModel.html#withStructuredOutput) to get both the parsed output and the raw [`AIMessage`](https://reference.langchain.com/javascript/classes/_langchain_core.messages.AIMessage.html)
  * **Validation**: Zod models provide automatic validation, while JSON Schema requires manual validation

  See your [provider's integration page](/oss/javascript/integrations/providers/overview) for supported methods and configuration options.
</Note>

<Accordion title="Example: Message output alongside parsed structure">
  It can be useful to return the raw [`AIMessage`](https://reference.langchain.com/javascript/classes/_langchain_core.messages.AIMessage.html) object alongside the parsed representation to access response metadata such as [token counts](#token-usage). To do this, set [`include_raw=True`](https://reference.langchain.com/javascript/classes/_langchain_core.language_models_chat_models.BaseChatModel.html#withStructuredOutput) when calling [`with_structured_output`](https://reference.langchain.com/javascript/classes/_langchain_core.language_models_chat_models.BaseChatModel.html#withStructuredOutput):

  ```typescript  theme={null}
  import * as z from "zod";

  const Movie = z.object({
    title: z.string().describe("The title of the movie"),
    year: z.number().describe("The year the movie was released"),
    director: z.string().describe("The director of the movie"),
    rating: z.number().describe("The movie's rating out of 10"),
    title: z.string().describe("The title of the movie"),
    year: z.number().describe("The year the movie was released"),
    director: z.string().describe("The director of the movie"),  // [!code highlight]
    rating: z.number().describe("The movie's rating out of 10"),
  });

  const modelWithStructure = model.withStructuredOutput(Movie, { includeRaw: true });

  const response = await modelWithStructure.invoke("Provide details about the movie Inception");
  console.log(response);
  // {
  //   raw: AIMessage { ... },
  //   parsed: { title: "Inception", ... }
  // }
  ```
</Accordion>

<Accordion title="Example: Nested structures">
  Schemas can be nested:

  ```typescript  theme={null}
  import * as z from "zod";

  const Actor = z.object({
    name: str
    role: z.string(),
  });

  const MovieDetails = z.object({
    title: z.string(),
    year: z.number(),
    cast: z.array(Actor),
    genres: z.array(z.string()),
    budget: z.number().nullable().describe("Budget in millions USD"),
  });

  const modelWithStructure = model.withStructuredOutput(MovieDetails);
  ```
</Accordion>

***

## Advanced topics

### Model profiles

<Info>
  Model profiles require `langchain>=1.1`.
</Info>

LangChain chat models can expose a dictionary of supported features and capabilities through a `.profile` property:

```typescript  theme={null}
model.profile;
// {
//   maxInputTokens: 400000,
//   imageInputs: true,
//   reasoningOutput: true,
//   toolCalling: true,
//   ...
// }
```

Refer to the full set of fields in the [API reference](https://reference.langchain.com/javascript/interfaces/_langchain_core.language_models_profile.ModelProfile.html).

Much of the model profile data is powered by the [models.dev](https://github.com/sst/models.dev) project, an open source initiative that provides model capability data. This data is augmented with additional fields for purposes of use with LangChain. These augmentations are kept aligned with the upstream project as it evolves.

Model profile data allow applications to work around model capabilities dynamically. For example:

1. [Summarization middleware](/oss/javascript/langchain/middleware/built-in#summarization) can trigger summarization based on a model's context window size.
2. [Structured output](/oss/javascript/langchain/structured-output) strategies in `createAgent` can be inferred automatically (e.g., by checking support for native structured output features).
3. Model inputs can be gated based on supported [modalities](#multimodal) and maximum input tokens.

<Accordion title="Modify profile data">
  Model profile data can be changed if it is missing, stale, or incorrect.

  **Option 1 (quick fix)**

  You can instantiate a chat model with any valid profile:

  ```typescript  theme={null}
  const customProfile = {
  maxInputTokens: 100_000,
  toolCalling: true,
  structuredOutput: true,
  // ...
  };
  const model = initChatModel("...", { profile: customProfile });
  ```

  **Option 2 (fix data upstream)**

  The primary source for the data is the [models.dev](https://models.dev/) project. These data are merged with additional fields and overrides in LangChain [integration packages](/oss/javascript/integrations/providers/overview) and are shipped with those packages.

  Model profile data can be updated through the following process:

  1. (If needed) update the source data at [models.dev](https://models.dev/) through a pull request to its [repository on GitHub](https://github.com/sst/models.dev).
  2. (If needed) update additional fields and overrides in `langchain-<package>/profiles.toml` through a pull request to the LangChain [integration package](/oss/javascript/integrations/providers/overview).
</Accordion>

<Warning>
  Model profiles are a beta feature. The format of a profile is subject to change.
</Warning>

### Multimodal

Certain models can process and return non-textual data such as images, audio, and video. You can pass non-textual data to a model by providing [content blocks](/oss/javascript/langchain/messages#message-content).

<Tip>
  All LangChain chat models with underlying multimodal capabilities support:

  1. Data in the cross-provider standard format (see [our messages guide](/oss/javascript/langchain/messages))
  2. OpenAI [chat completions](https://platform.openai.com/docs/api-reference/chat) format
  3. Any format that is native to that specific provider (e.g., Anthropic models accept Anthropic native format)
</Tip>

See the [multimodal section](/oss/javascript/langchain/messages#multimodal) of the messages guide for details.

<Tooltip tip="Not all LLMs are made equally!" cta="See reference" href="https://models.dev/">Some models</Tooltip> can return multimodal data as part of their response. If invoked to do so, the resulting [`AIMessage`](https://reference.langchain.com/javascript/classes/_langchain_core.messages.AIMessage.html) will have content blocks with multimodal types.

```typescript Multimodal output theme={null}
const response = await model.invoke("Create a picture of a cat");
console.log(response.contentBlocks);
// [
//   { type: "text", text: "Here's a picture of a cat" },
//   { type: "image", data: "...", mimeType: "image/jpeg" },
// ]
```

See the [integrations page](/oss/javascript/integrations/providers/overview) for details on specific providers.

### Reasoning

Many models are capable of performing multi-step reasoning to arrive at a conclusion. This involves breaking down complex problems into smaller, more manageable steps.

**If supported by the underlying model,** you can surface this reasoning process to better understand how the model arrived at its final answer.

<CodeGroup>
  ```typescript Stream reasoning output theme={null}
  const stream = model.stream("Why do parrots have colorful feathers?");
  for await (const chunk of stream) {
      const reasoningSteps = chunk.contentBlocks.filter(b => b.type === "reasoning");
      console.log(reasoningSteps.length > 0 ? reasoningSteps : chunk.text);
  }
  ```

  ```typescript Complete reasoning output theme={null}
  const response = await model.invoke("Why do parrots have colorful feathers?");
  const reasoningSteps = response.contentBlocks.filter(b => b.type === "reasoning");
  console.log(reasoningSteps.map(step => step.reasoning).join(" "));
  ```
</CodeGroup>

Depending on the model, you can sometimes specify the level of effort it should put into reasoning. Similarly, you can request that the model turn off reasoning entirely. This may take the form of categorical "tiers" of reasoning (e.g., `'low'` or `'high'`) or integer token budgets.

For details, see the [integrations page](/oss/javascript/integrations/providers/overview) or [reference](https://reference.langchain.com/python/integrations/) for your respective chat model.

### Local models

LangChain supports running models locally on your own hardware. This is useful for scenarios where either data privacy is critical, you want to invoke a custom model, or when you want to avoid the costs incurred when using a cloud-based model.

[Ollama](/oss/javascript/integrations/chat/ollama) is one of the easiest ways to run chat and embedding models locally.

### Prompt caching

Many providers offer prompt caching features to reduce latency and cost on repeat processing of the same tokens. These features can be **implicit** or **explicit**:

* **Implicit prompt caching:** providers will automatically pass on cost savings if a request hits a cache. Examples: [OpenAI](/oss/javascript/integrations/chat/openai) and [Gemini](/oss/javascript/integrations/chat/google_generative_ai).
* **Explicit caching:** providers allow you to manually indicate cache points for greater control or to guarantee cost savings. Examples:
  * [`ChatOpenAI`](https://reference.langchain.com/javascript/classes/_langchain_openai.ChatOpenAI.html) (via `prompt_cache_key`)
  * Anthropic's [`AnthropicPromptCachingMiddleware`](/oss/javascript/integrations/chat/anthropic#prompt-caching)
  * [Gemini](https://reference.langchain.com/python/integrations/langchain_google_genai/).
  * [AWS Bedrock](/oss/javascript/integrations/chat/bedrock#prompt-caching)

<Warning>
  Prompt caching is often only engaged above a minimum input token threshold. See [provider pages](/oss/javascript/integrations/chat) for details.
</Warning>

Cache usage will be reflected in the [usage metadata](/oss/javascript/langchain/messages#token-usage) of the model response.

### Server-side tool use

Some providers support server-side [tool-calling](#tool-calling) loops: models can interact with web search, code interpreters, and other tools and analyze the results in a single conversational turn.

If a model invokes a tool server-side, the content of the response message will include content representing the invocation and result of the tool. Accessing the [content blocks](/oss/javascript/langchain/messages#standard-content-blocks) of the response will return the server-side tool calls and results in a provider-agnostic format:

```typescript  theme={null}
import { initChatModel } from "langchain";

const model = await initChatModel("gpt-4.1-mini");
const modelWithTools = model.bindTools([{ type: "web_search" }])

const message = await modelWithTools.invoke("What was a positive news story from today?");
console.log(message.contentBlocks);
```

This represents a single conversational turn; there are no associated [ToolMessage](/oss/javascript/langchain/messages#tool-message) objects that need to be passed in as in client-side [tool-calling](#tool-calling).

See the [integration page](/oss/javascript/integrations/chat) for your given provider for available tools and usage details.

### Base URL or proxy

For many chat model integrations, you can configure the base URL for API requests, which allows you to use model providers that have OpenAI-compatible APIs or to use a proxy server.

<Accordion title="Base URL" icon="link">
  Many model providers offer OpenAI-compatible APIs (e.g., [Together AI](https://www.together.ai/), [vLLM](https://github.com/vllm-project/vllm)). You can use `initChatModel` with these providers by specifying the appropriate `base_url` parameter:

  ```python  theme={null}
  model = initChatModel(
      "MODEL_NAME",
      {
          modelProvider: "openai",
          baseUrl: "BASE_URL",
          apiKey: "YOUR_API_KEY",
      }
  )
  ```

  <Note>
    When using direct chat model class instantiation, the parameter name may vary by provider. Check the respective [reference](/oss/javascript/integrations/providers/overview) for details.
  </Note>
</Accordion>

### Log probabilities

Certain models can be configured to return token-level log probabilities representing the likelihood of a given token by setting the `logprobs` parameter when initializing the model:

```typescript  theme={null}
const model = new ChatOpenAI({
    model: "gpt-4o",
    logprobs: true,
});

const responseMessage = await model.invoke("Why do parrots talk?");

responseMessage.response_metadata.logprobs.content.slice(0, 5);
```

### Token usage

A number of model providers return token usage information as part of the invocation response. When available, this information will be included on the [`AIMessage`](https://reference.langchain.com/javascript/classes/_langchain_core.messages.AIMessage.html) objects produced by the corresponding model. For more details, see the [messages](/oss/javascript/langchain/messages) guide.

<Note>
  Some provider APIs, notably OpenAI and Azure OpenAI chat completions, require users opt-in to receiving token usage data in streaming contexts. See the [streaming usage metadata](/oss/javascript/integrations/chat/openai#streaming-usage-metadata) section of the integration guide for details.
</Note>

### Invocation config

When invoking a model, you can pass additional configuration through the `config` parameter using a [`RunnableConfig`](https://reference.langchain.com/javascript/interfaces/_langchain_core.runnables.RunnableConfig.html) object. This provides run-time control over execution behavior, callbacks, and metadata tracking.

Common configuration options include:

```typescript Invocation with config theme={null}
const response = await model.invoke(
    "Tell me a joke",
    {
        runName: "joke_generation",      // Custom name for this run
        tags: ["humor", "demo"],          // Tags for categorization
        metadata: {"user_id": "123"},     // Custom metadata
        callbacks: [my_callback_handler], // Callback handlers
    }
)
```

These configuration values are particularly useful when:

* Debugging with [LangSmith](https://docs.langchain.com/langsmith/home) tracing
* Implementing custom logging or monitoring
* Controlling resource usage in production
* Tracking invocations across complex pipelines

<Accordion title="Key configuration attributes">
  <ParamField body="runName" type="string">
    Identifies this specific invocation in logs and traces. Not inherited by sub-calls.
  </ParamField>

  <ParamField body="tags" type="string[]">
    Labels inherited by all sub-calls for filtering and organization in debugging tools.
  </ParamField>

  <ParamField body="metadata" type="object">
    Custom key-value pairs for tracking additional context, inherited by all sub-calls.
  </ParamField>

  <ParamField body="maxConcurrency" type="number">
    Controls the maximum number of parallel calls when using `batch()`.
  </ParamField>

  <ParamField body="callbacks" type="CallbackHandler[]">
    Handlers for monitoring and responding to events during execution.
  </ParamField>

  <ParamField body="recursion_limit" type="number">
    Maximum recursion depth for chains to prevent infinite loops in complex pipelines.
  </ParamField>
</Accordion>

<Tip>
  See full [`RunnableConfig`](https://reference.langchain.com/javascript/interfaces/_langchain_core.runnables.RunnableConfig.html) reference for all supported attributes.
</Tip>

***

<Callout icon="pen-to-square" iconType="regular">
  [Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/oss/langchain/models.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).
</Callout>

<Tip icon="terminal" iconType="regular">
  [Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.
</Tip>

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.langchain.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Tools

Tools extend what [agents](/oss/javascript/langchain/agents) can do—letting them fetch real-time data, execute code, query external databases, and take actions in the world.

Under the hood, tools are callable functions with well-defined inputs and outputs that get passed to a [chat model](/oss/javascript/langchain/models). The model decides when to invoke a tool based on the conversation context, and what input arguments to provide.

<Tip>
  For details on how models handle tool calls, see [Tool calling](/oss/javascript/langchain/models#tool-calling).
</Tip>

## Create tools

### Basic tool definition

The simplest way to create a tool is by importing the `tool` function from the `langchain` package. You can use [zod](https://zod.dev/) to define the tool's input schema:

```ts  theme={null}
import * as z from "zod"
import { tool } from "langchain"

const searchDatabase = tool(
  ({ query, limit }) => `Found ${limit} results for '${query}'`,
  {
    name: "search_database",
    description: "Search the customer database for records matching the query.",
    schema: z.object({
      query: z.string().describe("Search terms to look for"),
      limit: z.number().describe("Maximum number of results to return"),
    }),
  }
);
```

<Note>
  **Server-side tool use**

  Some chat models (e.g., [OpenAI](/oss/javascript/integrations/chat/openai), [Anthropic](/oss/javascript/integrations/chat/anthropic), and [Gemini](/oss/javascript/integrations/chat/google_generative_ai)) feature [built-in tools](/oss/javascript/langchain/models#server-side-tool-use) that are executed server-side, such as web search and code interpreters. Refer to the [provider overview](/oss/javascript/integrations/providers/overview) to learn how to access these tools with your specific chat model.
</Note>

## Accessing context

<Info>
  **Why this matters:** Tools are most powerful when they can access agent state, runtime context, and long-term memory. This enables tools to make context-aware decisions, personalize responses, and maintain information across conversations.

  The runtime context provides a structured way to supply runtime data, such as DB connections, user IDs, or config, into your tools. This avoids global state and keeps tools testable and reusable.
</Info>

#### Context

Tools can access an agent's runtime context through the `config` parameter:

```ts  theme={null}
import * as z from "zod"
import { ChatOpenAI } from "@langchain/openai"
import { createAgent } from "langchain"

const getUserName = tool(
  (_, config) => {
    return config.context.user_name
  },
  {
    name: "get_user_name",
    description: "Get the user's name.",
    schema: z.object({}),
  }
);

const contextSchema = z.object({
  user_name: z.string(),
});

const agent = createAgent({
  model: new ChatOpenAI({ model: "gpt-4o" }),
  tools: [getUserName],
  contextSchema,
});

const result = await agent.invoke(
  {
    messages: [{ role: "user", content: "What is my name?" }]
  },
  {
    context: { user_name: "John Smith" }
  }
);
```

#### Memory (Store)

Access persistent data across conversations using the store. The store is accessed via `config.store` and allows you to save and retrieve user-specific or application-specific data.

```ts expandable theme={null}
import * as z from "zod";
import { createAgent, tool } from "langchain";
import { InMemoryStore } from "@langchain/langgraph";
import { ChatOpenAI } from "@langchain/openai";

const store = new InMemoryStore();

// Access memory
const getUserInfo = tool(
  async ({ user_id }) => {
    const value = await store.get(["users"], user_id);
    console.log("get_user_info", user_id, value);
    return value;
  },
  {
    name: "get_user_info",
    description: "Look up user info.",
    schema: z.object({
      user_id: z.string(),
    }),
  }
);

// Update memory
const saveUserInfo = tool(
  async ({ user_id, name, age, email }) => {
    console.log("save_user_info", user_id, name, age, email);
    await store.put(["users"], user_id, { name, age, email });
    return "Successfully saved user info.";
  },
  {
    name: "save_user_info",
    description: "Save user info.",
    schema: z.object({
      user_id: z.string(),
      name: z.string(),
      age: z.number(),
      email: z.string(),
    }),
  }
);

const agent = createAgent({
  model: new ChatOpenAI({ model: "gpt-4o" }),
  tools: [getUserInfo, saveUserInfo],
  store,
});

// First session: save user info
await agent.invoke({
  messages: [
    {
      role: "user",
      content: "Save the following user: userid: abc123, name: Foo, age: 25, email: foo@langchain.dev",
    },
  ],
});

// Second session: get user info
const result = await agent.invoke({
  messages: [
    { role: "user", content: "Get user info for user with id 'abc123'" },
  ],
});

console.log(result);
// Here is the user info for user with ID "abc123":
// - Name: Foo
// - Age: 25
// - Email: foo@langchain.dev
```

#### Stream writer

Stream custom updates from tools as they execute using `config.streamWriter`. This is useful for providing real-time feedback to users about what a tool is doing.

```ts  theme={null}
import * as z from "zod";
import { tool, ToolRuntime } from "langchain";

const getWeather = tool(
  ({ city }, config: ToolRuntime) => {
    const writer = config.writer;

    // Stream custom updates as the tool executes
    if (writer) {
      writer(`Looking up data for city: ${city}`);
      writer(`Acquired data for city: ${city}`);
    }

    return `It's always sunny in ${city}!`;
  },
  {
    name: "get_weather",
    description: "Get weather for a given city.",
    schema: z.object({
      city: z.string(),
    }),
  }
);
```

***

<Callout icon="pen-to-square" iconType="regular">
  [Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/oss/langchain/tools.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).
</Callout>

<Tip icon="terminal" iconType="regular">
  [Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.
</Tip>

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.langchain.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Messages

Messages are the fundamental unit of context for models in LangChain. They represent the input and output of models, carrying both the content and metadata needed to represent the state of a conversation when interacting with an LLM.

Messages are objects that contain:

* <Icon icon="user" size={16} /> [**Role**](#message-types) - Identifies the message type (e.g. `system`, `user`)
* <Icon icon="folder-closed" size={16} /> [**Content**](#message-content) - Represents the actual content of the message (like text, images, audio, documents, etc.)
* <Icon icon="tag" size={16} /> [**Metadata**](#message-metadata) - Optional fields such as response information, message IDs, and token usage

LangChain provides a standard message type that works across all model providers, ensuring consistent behavior regardless of the model being called.

## Basic usage

The simplest way to use messages is to create message objects and pass them to a model when [invoking](/oss/javascript/langchain/models#invocation).

```typescript  theme={null}
import { initChatModel, HumanMessage, SystemMessage } from "langchain";

const model = await initChatModel("gpt-5-nano");

const systemMsg = new SystemMessage("You are a helpful assistant.");
const humanMsg = new HumanMessage("Hello, how are you?");

const messages = [systemMsg, humanMsg];
const response = await model.invoke(messages);  // Returns AIMessage
```

### Text prompts

Text prompts are strings - ideal for straightforward generation tasks where you don't need to retain conversation history.

```typescript  theme={null}
const response = await model.invoke("Write a haiku about spring");
```

**Use text prompts when:**

* You have a single, standalone request
* You don't need conversation history
* You want minimal code complexity

### Message prompts

Alternatively, you can pass in a list of messages to the model by providing a list of message objects.

```typescript  theme={null}
import { SystemMessage, HumanMessage, AIMessage } from "langchain";

const messages = [
  new SystemMessage("You are a poetry expert"),
  new HumanMessage("Write a haiku about spring"),
  new AIMessage("Cherry blossoms bloom..."),
];
const response = await model.invoke(messages);
```

**Use message prompts when:**

* Managing multi-turn conversations
* Working with multimodal content (images, audio, files)
* Including system instructions

### Dictionary format

You can also specify messages directly in OpenAI chat completions format.

```typescript  theme={null}
const messages = [
  { role: "system", content: "You are a poetry expert" },
  { role: "user", content: "Write a haiku about spring" },
  { role: "assistant", content: "Cherry blossoms bloom..." },
];
const response = await model.invoke(messages);
```

## Message types

* <Icon icon="gear" size={16} /> [System message](#system-message) - Tells the model how to behave and provide context for interactions
* <Icon icon="user" size={16} /> [Human message](#human-message) - Represents user input and interactions with the model
* <Icon icon="robot" size={16} /> [AI message](#ai-message) - Responses generated by the model, including text content, tool calls, and metadata
* <Icon icon="wrench" size={16} /> [Tool message](#tool-message) - Represents the outputs of [tool calls](/oss/javascript/langchain/models#tool-calling)

### System message

A [`SystemMessage`](https://reference.langchain.com/javascript/classes/_langchain_core.messages.SystemMessage.html) represent an initial set of instructions that primes the model's behavior. You can use a system message to set the tone, define the model's role, and establish guidelines for responses.

```typescript Basic instructions theme={null}
import { SystemMessage, HumanMessage, AIMessage } from "langchain";

const systemMsg = new SystemMessage("You are a helpful coding assistant.");

const messages = [
  systemMsg,
  new HumanMessage("How do I create a REST API?"),
];
const response = await model.invoke(messages);
```

```typescript Detailed persona theme={null}
import { SystemMessage, HumanMessage } from "langchain";

const systemMsg = new SystemMessage(`
You are a senior TypeScript developer with expertise in web frameworks.
Always provide code examples and explain your reasoning.
Be concise but thorough in your explanations.
`);

const messages = [
  systemMsg,
  new HumanMessage("How do I create a REST API?"),
];
const response = await model.invoke(messages);
```

***

### Human message

A [`HumanMessage`](https://reference.langchain.com/javascript/classes/_langchain_core.messages.HumanMessage.html) represents user input and interactions. They can contain text, images, audio, files, and any other amount of multimodal [content](#message-content).

#### Text content

```typescript Message object theme={null}
const response = await model.invoke([
  new HumanMessage("What is machine learning?"),
]);
```

```typescript String shortcut theme={null}
const response = await model.invoke("What is machine learning?");
```

#### Message metadata

```typescript Add metadata theme={null}
const humanMsg = new HumanMessage({
  content: "Hello!",
  name: "alice",
  id: "msg_123",
});
```

<Note>
  The `name` field behavior varies by provider – some use it for user identification, others ignore it. To check, refer to the model provider's [reference](https://reference.langchain.com/python/integrations/).
</Note>

***

### AI message

An [`AIMessage`](https://reference.langchain.com/javascript/classes/_langchain_core.messages.AIMessage.html) represents the output of a model invocation. They can include multimodal data, tool calls, and provider-specific metadata that you can later access.

```typescript  theme={null}
const response = await model.invoke("Explain AI");
console.log(typeof response);  // AIMessage
```

[`AIMessage`](https://reference.langchain.com/javascript/classes/_langchain_core.messages.AIMessage.html) objects are returned by the model when calling it, which contains all of the associated metadata in the response.

Providers weigh/contextualize types of messages differently, which means it is sometimes helpful to manually create a new [`AIMessage`](https://reference.langchain.com/javascript/classes/_langchain_core.messages.AIMessage.html) object and insert it into the message history as if it came from the model.

```typescript  theme={null}
import { AIMessage, SystemMessage, HumanMessage } from "langchain";

const aiMsg = new AIMessage("I'd be happy to help you with that question!");

const messages = [
  new SystemMessage("You are a helpful assistant"),
  new HumanMessage("Can you help me?"),
  aiMsg,  // Insert as if it came from the model
  new HumanMessage("Great! What's 2+2?")
]

const response = await model.invoke(messages);
```

<Accordion title="Attributes">
  <ParamField path="text" type="string">
    The text content of the message.
  </ParamField>

  <ParamField path="content" type="string | ContentBlock[]">
    The raw content of the message.
  </ParamField>

  <ParamField path="content_blocks" type="ContentBlock.Standard[]">
    The standardized content blocks of the message. (See [content](#message-content))
  </ParamField>

  <ParamField path="tool_calls" type="ToolCall[] | None">
    The tool calls made by the model.

    Empty if no tools are called.
  </ParamField>

  <ParamField path="id" type="string">
    A unique identifier for the message (either automatically generated by LangChain or returned in the provider response)
  </ParamField>

  <ParamField path="usage_metadata" type="UsageMetadata | None">
    The usage metadata of the message, which can contain token counts when available. See [`UsageMetadata`](https://reference.langchain.com/javascript/types/_langchain_core.messages.UsageMetadata.html).
  </ParamField>

  <ParamField path="response_metadata" type="ResponseMetadata | None">
    The response metadata of the message.
  </ParamField>
</Accordion>

#### Tool calls

When models make [tool calls](/oss/javascript/langchain/models#tool-calling), they're included in the [`AIMessage`](https://reference.langchain.com/javascript/classes/_langchain_core.messages.AIMessage.html):

```typescript  theme={null}
const modelWithTools = model.bindTools([getWeather]);
const response = await modelWithTools.invoke("What's the weather in Paris?");

for (const toolCall of response.tool_calls) {
  console.log(`Tool: ${toolCall.name}`);
  console.log(`Args: ${toolCall.args}`);
  console.log(`ID: ${toolCall.id}`);
}
```

Other structured data, such as reasoning or citations, can also appear in message [content](/oss/javascript/langchain/messages#message-content).

#### Token usage

An [`AIMessage`](https://reference.langchain.com/javascript/classes/_langchain_core.messages.AIMessage.html) can hold token counts and other usage metadata in its [`usage_metadata`](https://reference.langchain.com/javascript/types/_langchain_core.messages.UsageMetadata.html) field:

```typescript  theme={null}
import { initChatModel } from "langchain";

const model = await initChatModel("gpt-5-nano");

const response = await model.invoke("Hello!");
console.log(response.usage_metadata);
```

```json  theme={null}
{
  "output_tokens": 304,
  "input_tokens": 8,
  "total_tokens": 312,
  "input_token_details": {
    "cache_read": 0
  },
  "output_token_details": {
    "reasoning": 256
  }
}
```

See [`UsageMetadata`](https://reference.langchain.com/javascript/types/_langchain_core.messages.UsageMetadata.html) for details.

#### Streaming and chunks

During streaming, you'll receive [`AIMessageChunk`](https://reference.langchain.com/javascript/classes/_langchain_core.messages.AIMessageChunk.html) objects that can be combined into a full message object:

<CodeGroup>
  ```typescript  theme={null}
  import { AIMessageChunk } from "langchain";

  let finalChunk: AIMessageChunk | undefined;
  for (const chunk of chunks) {
    finalChunk = finalChunk ? finalChunk.concat(chunk) : chunk;
  }
  ```
</CodeGroup>

<Note>
  Learn more:

  * [Streaming tokens from chat models](/oss/javascript/langchain/models#stream)
  * [Streaming tokens and/or steps from agents](/oss/javascript/langchain/streaming)
</Note>

***

### Tool message

For models that support [tool calling](/oss/javascript/langchain/models#tool-calling), AI messages can contain tool calls. Tool messages are used to pass the results of a single tool execution back to the model.

[Tools](/oss/javascript/langchain/tools) can generate [`ToolMessage`](https://reference.langchain.com/javascript/classes/_langchain_core.messages.ToolMessage.html) objects directly. Below, we show a simple example. Read more in the [tools guide](/oss/javascript/langchain/tools).

```typescript  theme={null}
import { AIMessage, ToolMessage } from "langchain";

const aiMessage = new AIMessage({
  content: [],
  tool_calls: [{
    name: "get_weather",
    args: { location: "San Francisco" },
    id: "call_123"
  }]
});

const toolMessage = new ToolMessage({
  content: "Sunny, 72°F",
  tool_call_id: "call_123"
});

const messages = [
  new HumanMessage("What's the weather in San Francisco?"),
  aiMessage,  // Model's tool call
  toolMessage,  // Tool execution result
];

const response = await model.invoke(messages);  // Model processes the result
```

<Accordion title="Attributes">
  <ParamField path="content" type="string" required>
    The stringified output of the tool call.
  </ParamField>

  <ParamField path="tool_call_id" type="string" required>
    The ID of the tool call that this message is responding to. Must match the ID of the tool call in the [`AIMessage`](https://reference.langchain.com/javascript/classes/_langchain_core.messages.AIMessage.html).
  </ParamField>

  <ParamField path="name" type="string" required>
    The name of the tool that was called.
  </ParamField>

  <ParamField path="artifact" type="dict">
    Additional data not sent to the model but can be accessed programmatically.
  </ParamField>
</Accordion>

<Note>
  The `artifact` field stores supplementary data that won't be sent to the model but can be accessed programmatically. This is useful for storing raw results, debugging information, or data for downstream processing without cluttering the model's context.

  <Accordion title="Example: Using artifact for retrieval metadata">
    For example, a [retrieval](/oss/javascript/langchain/retrieval) tool could retrieve a passage from a document for reference by a model. Where message `content` contains text that the model will reference, an `artifact` can contain document identifiers or other metadata that an application can use (e.g., to render a page). See example below:

    ```typescript  theme={null}
    import { ToolMessage } from "langchain";

    // Artifact available downstream
    const artifact = { document_id: "doc_123", page: 0 };

    const toolMessage = new ToolMessage({
      content: "It was the best of times, it was the worst of times.",
      tool_call_id: "call_123",
      name: "search_books",
      artifact
    });
    ```

    See the [RAG tutorial](/oss/javascript/langchain/rag) for an end-to-end example of building retrieval [agents](/oss/javascript/langchain/agents) with LangChain.
  </Accordion>
</Note>

***

## Message content

You can think of a message's content as the payload of data that gets sent to the model. Messages have a `content` attribute that is loosely-typed, supporting strings and lists of untyped objects (e.g., dictionaries). This allows support for provider-native structures directly in LangChain chat models, such as [multimodal](#multimodal) content and other data.

Separately, LangChain provides dedicated content types for text, reasoning, citations, multi-modal data, server-side tool calls, and other message content. See [content blocks](#standard-content-blocks) below.

LangChain chat models accept message content in the `content` attribute.

This may contain either:

1. A string
2. A list of content blocks in a provider-native format
3. A list of [LangChain's standard content blocks](#standard-content-blocks)

See below for an example using [multimodal](#multimodal) inputs:

```typescript  theme={null}
import { HumanMessage } from "langchain";

// String content
const humanMessage = new HumanMessage("Hello, how are you?");

// Provider-native format (e.g., OpenAI)
const humanMessage = new HumanMessage({
  content: [
    { type: "text", text: "Hello, how are you?" },
    {
      type: "image_url",
      image_url: { url: "https://example.com/image.jpg" },
    },
  ],
});

// List of standard content blocks
const humanMessage = new HumanMessage({
  contentBlocks: [
    { type: "text", text: "Hello, how are you?" },
    { type: "image", url: "https://example.com/image.jpg" },
  ],
});
```

### Standard content blocks

LangChain provides a standard representation for message content that works across providers.

Message objects implement a `contentBlocks` property that will lazily parse the `content` attribute into a standard, type-safe representation. For example, messages generated from [`ChatAnthropic`](/oss/javascript/integrations/chat/anthropic) or [`ChatOpenAI`](/oss/javascript/integrations/chat/openai) will include `thinking` or `reasoning` blocks in the format of the respective provider, but can be lazily parsed into a consistent [`ReasoningContentBlock`](#content-block-reference) representation:

<Tabs>
  <Tab title="Anthropic">
    ```typescript  theme={null}
    import { AIMessage } from "@langchain/core/messages";

    const message = new AIMessage({
      content: [
        {
          "type": "thinking",
          "thinking": "...",
          "signature": "WaUjzkyp...",
        },
        {
          "type":"text",
          "text": "...",
          "id": "msg_abc123",
        },
      ],
      response_metadata: { model_provider: "anthropic" },
    });

    console.log(message.contentBlocks);
    ```
  </Tab>

  <Tab title="OpenAI">
    ```typescript  theme={null}
    import { AIMessage } from "@langchain/core/messages";

    const message = new AIMessage({
      content: [
        {
          "type": "reasoning",
          "id": "rs_abc123",
          "summary": [
            {"type": "summary_text", "text": "summary 1"},
            {"type": "summary_text", "text": "summary 2"},
          ],
        },
        {"type": "text", "text": "..."},
      ],
      response_metadata: { model_provider: "openai" },
    });

    console.log(message.contentBlocks);
    ```
  </Tab>
</Tabs>

See the [integrations guides](/oss/javascript/integrations/providers/overview) to get started with the
inference provider of your choice.

<Note>
  **Serializing standard content**

  If an application outside of LangChain needs access to the standard content block
  representation, you can opt-in to storing content blocks in message content.

  To do this, you can set the `LC_OUTPUT_VERSION` environment variable to `v1`. Or,
  initialize any chat model with `outputVersion: "v1"`:

  ```typescript  theme={null}
  import { initChatModel } from "langchain";

  const model = await initChatModel(
    "gpt-5-nano",
    { outputVersion: "v1" }
  );
  ```
</Note>

### Multimodal

**Multimodality** refers to the ability to work with data that comes in different
forms, such as text, audio, images, and video. LangChain includes standard types
for these data that can be used across providers.

[Chat models](/oss/javascript/langchain/models) can accept multimodal data as input and generate
it as output. Below we show short examples of input messages featuring multimodal data.

<Note>
  Extra keys can be included top-level in the content block or nested in `"extras": {"key": value}`.

  [OpenAI](/oss/javascript/integrations/chat/openai#pdfs) and [AWS Bedrock Converse](/oss/javascript/integrations/chat/bedrock),
  for example, require a filename for PDFs. See the [provider page](/oss/javascript/integrations/providers/overview)
  for your chosen model for specifics.
</Note>

<CodeGroup>
  ```typescript Image input theme={null}
  // From URL
  const message = new HumanMessage({
    content: [
      { type: "text", text: "Describe the content of this image." },
      {
        type: "image",
        source_type: "url",
        url: "https://example.com/path/to/image.jpg"
      },
    ],
  });

  // From base64 data
  const message = new HumanMessage({
    content: [
      { type: "text", text: "Describe the content of this image." },
      {
        type: "image",
        source_type: "base64",
        data: "AAAAIGZ0eXBtcDQyAAAAAGlzb21tcDQyAAACAGlzb2...",
      },
    ],
  });

  // From provider-managed File ID
  const message = new HumanMessage({
    content: [
      { type: "text", text: "Describe the content of this image." },
      { type: "image", source_type: "id", id: "file-abc123" },
    ],
  });
  ```

  ```typescript PDF document input theme={null}
  // From URL
  const message = new HumanMessage({
    content: [
      { type: "text", text: "Describe the content of this document." },
      { type: "file", source_type: "url", url: "https://example.com/path/to/document.pdf", mime_type: "application/pdf" },
    ],
  });

  // From base64 data
  const message = new HumanMessage({
    content: [
      { type: "text", text: "Describe the content of this document." },
      {
        type: "file",
        source_type: "base64",
        data: "AAAAIGZ0eXBtcDQyAAAAAGlzb21tcDQyAAACAGlzb2...",
        mime_type: "application/pdf",
      },
    ],
  });

  // From provider-managed File ID
  const message = new HumanMessage({
    content: [
      { type: "text", text: "Describe the content of this document." },
      { type: "file", source_type: "id", id: "file-abc123" },
    ],
  });
  ```

  ```typescript Audio input theme={null}
  // From base64 data
  const message = new HumanMessage({
    content: [
      { type: "text", text: "Describe the content of this audio." },
      {
        type: "audio",
        source_type: "base64",
        data: "AAAAIGZ0eXBtcDQyAAAAAGlzb21tcDQyAAACAGlzb2...",
      },
    ],
  });

  // From provider-managed File ID
  const message = new HumanMessage({
    content: [
      { type: "text", text: "Describe the content of this audio." },
      { type: "audio", source_type: "id", id: "file-abc123" },
    ],
  });
  ```

  ```typescript Video input theme={null}
  // From base64 data
  const message = new HumanMessage({
    content: [
      { type: "text", text: "Describe the content of this video." },
      {
        type: "video",
        source_type: "base64",
        data: "AAAAIGZ0eXBtcDQyAAAAAGlzb21tcDQyAAACAGlzb2...",
      },
    ],
  });

  // From provider-managed File ID
  const message = new HumanMessage({
    content: [
      { type: "text", text: "Describe the content of this video." },
      { type: "video", source_type: "id", id: "file-abc123" },
    ],
  });
  ```
</CodeGroup>

<Warning>
  Not all models support all file types. Check the model provider's [reference](https://reference.langchain.com/python/integrations/) for supported formats and size limits.
</Warning>

### Content block reference

Content blocks are represented (either when creating a message or accessing the `contentBlocks` field) as a list of typed objects. Each item in the list must adhere to one of the following block types:

<AccordionGroup>
  <Accordion title="Core" icon="cube">
    <AccordionGroup>
      <Accordion title="ContentBlock.Text" icon="text">
        **Purpose:** Standard text output

        <ParamField body="type" type="string" required>
          Always `"text"`
        </ParamField>

        <ParamField body="text" type="string" required>
          The text content
        </ParamField>

        <ParamField body="annotations" type="Citation[]">
          List of annotations for the text
        </ParamField>

        **Example:**

        ```typescript  theme={null}
        {
            type: "text",
            text: "Hello world",
            annotations: []
        }
        ```
      </Accordion>

      <Accordion title="ContentBlock.Reasoning" icon="brain">
        **Purpose:** Model reasoning steps

        <ParamField body="type" type="string" required>
          Always `"reasoning"`
        </ParamField>

        <ParamField body="reasoning" type="string" required>
          The reasoning content
        </ParamField>

        **Example:**

        ```typescript  theme={null}
        {
            type: "reasoning",
            reasoning: "The user is asking about..."
        }
        ```
      </Accordion>
    </AccordionGroup>
  </Accordion>

  <Accordion title="Multimodal" icon="images">
    <AccordionGroup>
      <Accordion title="ContentBlock.Multimodal.Image" icon="image">
        **Purpose:** Image data

        <ParamField body="type" type="string" required>
          Always `"image"`
        </ParamField>

        <ParamField body="url" type="string">
          URL pointing to the image location.
        </ParamField>

        <ParamField body="data" type="string">
          Base64-encoded image data.
        </ParamField>

        <ParamField body="fileId" type="string">
          Reference to the image in an external file storage system (e.g., OpenAI or Anthropic's Files API).
        </ParamField>

        <ParamField body="mimeType" type="string">
          Image [MIME type](https://www.iana.org/assignments/media-types/media-types.xhtml#image) (e.g., `image/jpeg`, `image/png`). Required for base64 data.
        </ParamField>
      </Accordion>

      <Accordion title="ContentBlock.Multimodal.Audio" icon="volume-high">
        **Purpose:** Audio data

        <ParamField body="type" type="string" required>
          Always `"audio"`
        </ParamField>

        <ParamField body="url" type="string">
          URL pointing to the audio location.
        </ParamField>

        <ParamField body="data" type="string">
          Base64-encoded audio data.
        </ParamField>

        <ParamField body="fileId" type="string">
          Reference to the audio file in an external file storage system (e.g., OpenAI or Anthropic's Files API).
        </ParamField>

        <ParamField body="mimeType" type="string">
          Audio [MIME type](https://www.iana.org/assignments/media-types/media-types.xhtml#audio) (e.g., `audio/mpeg`, `audio/wav`). Required for base64 data.
        </ParamField>
      </Accordion>

      <Accordion title="ContentBlock.Multimodal.Video" icon="video">
        **Purpose:** Video data

        <ParamField body="type" type="string" required>
          Always `"video"`
        </ParamField>

        <ParamField body="url" type="string">
          URL pointing to the video location.
        </ParamField>

        <ParamField body="data" type="string">
          Base64-encoded video data.
        </ParamField>

        <ParamField body="fileId" type="string">
          Reference to the video file in an external file storage system (e.g., OpenAI or Anthropic's Files API).
        </ParamField>

        <ParamField body="mimeType" type="string">
          Video [MIME type](https://www.iana.org/assignments/media-types/media-types.xhtml#video) (e.g., `video/mp4`, `video/webm`). Required for base64 data.
        </ParamField>
      </Accordion>

      <Accordion title="ContentBlock.Multimodal.File" icon="file">
        **Purpose:** Generic files (PDF, etc)

        <ParamField body="type" type="string" required>
          Always `"file"`
        </ParamField>

        <ParamField body="url" type="string">
          URL pointing to the file location.
        </ParamField>

        <ParamField body="data" type="string">
          Base64-encoded file data.
        </ParamField>

        <ParamField body="fileId" type="string">
          Reference to the file in an external file storage system (e.g., OpenAI or Anthropic's Files API).
        </ParamField>

        <ParamField body="mimeType" type="string">
          File [MIME type](https://www.iana.org/assignments/media-types/media-types.xhtml) (e.g., `application/pdf`). Required for base64 data.
        </ParamField>
      </Accordion>

      <Accordion title="ContentBlock.Multimodal.PlainText" icon="align-left">
        **Purpose:** Document text (`.txt`, `.md`)

        <ParamField body="type" type="string" required>
          Always `"text-plain"`
        </ParamField>

        <ParamField body="text" type="string" required>
          The text content
        </ParamField>

        <ParamField body="title" type="string">
          Title of the text content
        </ParamField>

        <ParamField body="mimeType" type="string">
          [MIME type](https://www.iana.org/assignments/media-types/media-types.xhtml) of the text (e.g., `text/plain`, `text/markdown`)
        </ParamField>
      </Accordion>
    </AccordionGroup>
  </Accordion>

  <Accordion title="Tool Calling" icon="wrench">
    <AccordionGroup>
      <Accordion title="ContentBlock.Tools.ToolCall" icon="function">
        **Purpose:** Function calls

        <ParamField body="type" type="string" required>
          Always `"tool_call"`
        </ParamField>

        <ParamField body="name" type="string" required>
          Name of the tool to call
        </ParamField>

        <ParamField body="args" type="object" required>
          Arguments to pass to the tool
        </ParamField>

        <ParamField body="id" type="string" required>
          Unique identifier for this tool call
        </ParamField>

        **Example:**

        ```typescript  theme={null}
        {
            type: "tool_call",
            name: "search",
            args: { query: "weather" },
            id: "call_123"
        }
        ```
      </Accordion>

      <Accordion title="ContentBlock.Tools.ToolCallChunk" icon="puzzle-piece">
        **Purpose:** Streaming tool fragments

        <ParamField body="type" type="string" required>
          Always `"tool_call_chunk"`
        </ParamField>

        <ParamField body="name" type="string">
          Name of the tool being called
        </ParamField>

        <ParamField body="args" type="string">
          Partial tool arguments (may be incomplete JSON)
        </ParamField>

        <ParamField body="id" type="string">
          Tool call identifier
        </ParamField>

        <ParamField body="index" type="number | string" required>
          Position of this chunk in the stream
        </ParamField>
      </Accordion>

      <Accordion title="ContentBlock.Tools.InvalidToolCall" icon="triangle-exclamation">
        **Purpose:** Malformed calls

        <ParamField body="type" type="string" required>
          Always `"invalid_tool_call"`
        </ParamField>

        <ParamField body="name" type="string">
          Name of the tool that failed to be called
        </ParamField>

        <ParamField body="args" type="string">
          Raw arguments that failed to parse
        </ParamField>

        <ParamField body="error" type="string" required>
          Description of what went wrong
        </ParamField>

        **Common errors:** Invalid JSON, missing required fields
      </Accordion>
    </AccordionGroup>
  </Accordion>

  <Accordion title="Server-Side Tool Execution" icon="server">
    <AccordionGroup>
      <Accordion title="ContentBlock.Tools.ServerToolCall" icon="wrench">
        **Purpose:** Tool call that is executed server-side.

        <ParamField body="type" type="string" required>
          Always `"server_tool_call"`
        </ParamField>

        <ParamField body="id" type="string" required>
          An identifier associated with the tool call.
        </ParamField>

        <ParamField body="name" type="string" required>
          The name of the tool to be called.
        </ParamField>

        <ParamField body="args" type="string" required>
          Partial tool arguments (may be incomplete JSON)
        </ParamField>
      </Accordion>

      <Accordion title="ContentBlock.Tools.ServerToolCallChunk" icon="puzzle-piece">
        **Purpose:** Streaming server-side tool call fragments

        <ParamField body="type" type="string" required>
          Always `"server_tool_call_chunk"`
        </ParamField>

        <ParamField body="id" type="string">
          An identifier associated with the tool call.
        </ParamField>

        <ParamField body="name" type="string">
          Name of the tool being called
        </ParamField>

        <ParamField body="args" type="string">
          Partial tool arguments (may be incomplete JSON)
        </ParamField>

        <ParamField body="index" type="number | string">
          Position of this chunk in the stream
        </ParamField>
      </Accordion>

      <Accordion title="ContentBlock.Tools.ServerToolResult" icon="box-open">
        **Purpose:** Search results

        <ParamField body="type" type="string" required>
          Always `"server_tool_result"`
        </ParamField>

        <ParamField body="tool_call_id" type="string" required>
          Identifier of the corresponding server tool call.
        </ParamField>

        <ParamField body="id" type="string">
          Identifier associated with the server tool result.
        </ParamField>

        <ParamField body="status" type="string" required>
          Execution status of the server-side tool. `"success"` or `"error"`.
        </ParamField>

        <ParamField body="output">
          Output of the executed tool.
        </ParamField>
      </Accordion>
    </AccordionGroup>
  </Accordion>

  <Accordion title="Provider-Specific Blocks" icon="plug">
    <Accordion title="ContentBlock.NonStandard" icon="asterisk">
      **Purpose:** Provider-specific escape hatch

      <ParamField body="type" type="string" required>
        Always `"non_standard"`
      </ParamField>

      <ParamField body="value" type="object" required>
        Provider-specific data structure
      </ParamField>

      **Usage:** For experimental or provider-unique features
    </Accordion>

    Additional provider-specific content types may be found within the [reference documentation](/oss/javascript/integrations/providers/overview) of each model provider.
  </Accordion>
</AccordionGroup>

Each of these content blocks mentioned above are indvidually addressable as types when importing the [`ContentBlock`](https://reference.langchain.com/javascript/types/_langchain_core.messages.MessageContent.html) type.

```typescript  theme={null}
import { ContentBlock } from "langchain";

// Text block
const textBlock: ContentBlock.Text = {
    type: "text",
    text: "Hello world",
}

// Image block
const imageBlock: ContentBlock.Multimodal.Image = {
    type: "image",
    url: "https://example.com/image.png",
    mimeType: "image/png",
}
```

<Tip>
  View the canonical type definitions in the [API reference](https://reference.langchain.com/javascript/modules/_langchain_core.messages.html).
</Tip>

<Info>
  Content blocks were introduced as a new property on messages in LangChain v1 to standardize content formats across providers while maintaining backward compatibility with existing code.

  Content blocks are not a replacement for the [`content`](https://reference.langchain.com/javascript/classes/_langchain_core.messages.BaseMessage.html#content) property, but rather a new property that can be used to access the content of a message in a standardized format.
</Info>

## Use with chat models

[Chat models](/oss/javascript/langchain/models) accept a sequence of message objects as input and return an [`AIMessage`](https://reference.langchain.com/javascript/classes/_langchain_core.messages.AIMessage.html) as output. Interactions are often stateless, so that a simple conversational loop involves invoking a model with a growing list of messages.

Refer to the below guides to learn more:

* Built-in features for [persisting and managing conversation histories](/oss/javascript/langchain/short-term-memory)
* Strategies for managing context windows, including [trimming and summarizing messages](/oss/javascript/langchain/short-term-memory#common-patterns)

***

<Callout icon="pen-to-square" iconType="regular">
  [Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/oss/langchain/messages.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).
</Callout>

<Tip icon="terminal" iconType="regular">
  [Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.
</Tip>

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.langchain.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Overview

> Stream real-time updates from agent runs

LangChain implements a streaming system to surface real-time updates.

Streaming is crucial for enhancing the responsiveness of applications built on LLMs. By displaying output progressively, even before a complete response is ready, streaming significantly improves user experience (UX), particularly when dealing with the latency of LLMs.

## Overview

LangChain's streaming system lets you surface live feedback from agent runs to your application.

What's possible with LangChain streaming:

* <Icon icon="brain" size={16} /> [**Stream agent progress**](#agent-progress) — get state updates after each agent step.
* <Icon icon="square-binary" size={16} /> [**Stream LLM tokens**](#llm-tokens) — stream language model tokens as they're generated.
* <Icon icon="table" size={16} /> [**Stream custom updates**](#custom-updates) — emit user-defined signals (e.g., `"Fetched 10/100 records"`).
* <Icon icon="layer-plus" size={16} /> [**Stream multiple modes**](#stream-multiple-modes) — choose from `updates` (agent progress), `messages` (LLM tokens + metadata), or `custom` (arbitrary user data).

See the [common patterns](#common-patterns) section below for additional end-to-end examples.

## Supported stream modes

Pass one or more of the following stream modes as a list to the [`stream`](https://reference.langchain.com/javascript/classes/_langchain_langgraph.index.CompiledStateGraph.html#stream) method:

| Mode       | Description                                                                                                                                                       |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `updates`  | Streams state updates after each agent step. If multiple updates are made in the same step (e.g., multiple nodes are run), those updates are streamed separately. |
| `messages` | Streams tuples of `(token, metadata)` from any graph nodes where an LLM is invoked.                                                                               |
| `custom`   | Streams custom data from inside your graph nodes using the stream writer.                                                                                         |

## Agent progress

To stream agent progress, use the [`stream`](https://reference.langchain.com/javascript/classes/_langchain_langgraph.index.CompiledStateGraph.html#stream) method with `streamMode: "updates"`. This emits an event after every agent step.

For example, if you have an agent that calls a tool once, you should see the following updates:

* **LLM node**: [`AIMessage`](https://reference.langchain.com/javascript/classes/_langchain_core.messages.AIMessage.html) with tool call requests
* **Tool node**: [`ToolMessage`](https://reference.langchain.com/javascript/classes/_langchain_core.messages.ToolMessage.html) with execution result
* **LLM node**: Final AI response

```typescript  theme={null}
import z from "zod";
import { createAgent, tool } from "langchain";

const getWeather = tool(
    async ({ city }) => {
        return `The weather in ${city} is always sunny!`;
    },
    {
        name: "get_weather",
        description: "Get weather for a given city.",
        schema: z.object({
        city: z.string(),
        }),
    }
);

const agent = createAgent({
    model: "gpt-5-nano",
    tools: [getWeather],
});

for await (const chunk of await agent.stream(
    { messages: [{ role: "user", content: "what is the weather in sf" }] },
    { streamMode: "updates" }
)) {
    const [step, content] = Object.entries(chunk)[0];
    console.log(`step: ${step}`);
    console.log(`content: ${JSON.stringify(content, null, 2)}`);
}
/**
 * step: model
 * content: {
 *   "messages": [
 *     {
 *       "kwargs": {
 *         // ...
 *         "tool_calls": [
 *           {
 *             "name": "get_weather",
 *             "args": {
 *               "city": "San Francisco"
 *             },
 *             "type": "tool_call",
 *             "id": "call_0qLS2Jp3MCmaKJ5MAYtr4jJd"
 *           }
 *         ],
 *         // ...
 *       }
 *     }
 *   ]
 * }
 * step: tools
 * content: {
 *   "messages": [
 *     {
 *       "kwargs": {
 *         "content": "The weather in San Francisco is always sunny!",
 *         "name": "get_weather",
 *         // ...
 *       }
 *     }
 *   ]
 * }
 * step: model
 * content: {
 *   "messages": [
 *     {
 *       "kwargs": {
 *         "content": "The latest update says: The weather in San Francisco is always sunny!\n\nIf you'd like real-time details (current temperature, humidity, wind, and today's forecast), I can pull the latest data for you. Want me to fetch that?",
 *         // ...
 *       }
 *     }
 *   ]
 * }
 */
```

## LLM tokens

To stream tokens as they are produced by the LLM, use `streamMode: "messages"`:

```typescript  theme={null}
import z from "zod";
import { createAgent, tool } from "langchain";

const getWeather = tool(
    async ({ city }) => {
        return `The weather in ${city} is always sunny!`;
    },
    {
        name: "get_weather",
        description: "Get weather for a given city.",
        schema: z.object({
        city: z.string(),
        }),
    }
);

const agent = createAgent({
    model: "gpt-4o-mini",
    tools: [getWeather],
});

for await (const [token, metadata] of await agent.stream(
    { messages: [{ role: "user", content: "what is the weather in sf" }] },
    { streamMode: "messages" }
)) {
    console.log(`node: ${metadata.langgraph_node}`);
    console.log(`content: ${JSON.stringify(token.contentBlocks, null, 2)}`);
}
```

## Custom updates

To stream updates from tools as they are executed, you can use the `writer` parameter from the configuration.

```typescript  theme={null}
import z from "zod";
import { tool, createAgent } from "langchain";
import { LangGraphRunnableConfig } from "@langchain/langgraph";

const getWeather = tool(
    async (input, config: LangGraphRunnableConfig) => {
        // Stream any arbitrary data
        config.writer?.(`Looking up data for city: ${input.city}`);
        // ... fetch city data
        config.writer?.(`Acquired data for city: ${input.city}`);
        return `It's always sunny in ${input.city}!`;
    },
    {
        name: "get_weather",
        description: "Get weather for a given city.",
        schema: z.object({
        city: z.string().describe("The city to get weather for."),
        }),
    }
);

const agent = createAgent({
    model: "gpt-4o-mini",
    tools: [getWeather],
});

for await (const chunk of await agent.stream(
    { messages: [{ role: "user", content: "what is the weather in sf" }] },
    { streamMode: "custom" }
)) {
    console.log(chunk);
}
```

```shell title="Output" theme={null}
Looking up data for city: San Francisco
Acquired data for city: San Francisco
```

<Note>
  If you add the `writer` parameter to your tool, you won't be able to invoke the tool outside of a LangGraph execution context without providing a writer function.
</Note>

## Stream multiple modes

You can specify multiple streaming modes by passing streamMode as an array: `streamMode: ["updates", "messages", "custom"]`.

The streamed outputs will be tuples of `[mode, chunk]` where `mode` is the name of the stream mode and `chunk` is the data streamed by that mode.

```typescript  theme={null}
import z from "zod";
import { tool, createAgent } from "langchain";
import { LangGraphRunnableConfig } from "@langchain/langgraph";

const getWeather = tool(
    async (input, config: LangGraphRunnableConfig) => {
        // Stream any arbitrary data
        config.writer?.(`Looking up data for city: ${input.city}`);
        // ... fetch city data
        config.writer?.(`Acquired data for city: ${input.city}`);
        return `It's always sunny in ${input.city}!`;
    },
    {
        name: "get_weather",
        description: "Get weather for a given city.",
        schema: z.object({
        city: z.string().describe("The city to get weather for."),
        }),
    }
);

const agent = createAgent({
    model: "gpt-4o-mini",
    tools: [getWeather],
});

for await (const [streamMode, chunk] of await agent.stream(
    { messages: [{ role: "user", content: "what is the weather in sf" }] },
    { streamMode: ["updates", "messages", "custom"] }
)) {
    console.log(`${streamMode}: ${JSON.stringify(chunk, null, 2)}`);
}
```

## Disable streaming

In some applications you might need to disable streaming of individual tokens for a given model. This is useful when:

* Working with [multi-agent](/oss/javascript/langchain/multi-agent) systems to control which agents stream their output
* Mixing models that support streaming with those that do not
* Deploying to [LangSmith](/langsmith/home) and wanting to prevent certain model outputs from being streamed to the client

Set `streaming: false` when initializing the model.

```typescript  theme={null}
import { ChatOpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
  model: "gpt-4o",
  streaming: false,  // [!code highlight]
});
```

<Tip>
  When deploying to LangSmith, set `streaming=False` on any models whose output you don't want streamed to the client. This is configured in your graph code before deployment.
</Tip>

<Note>
  Not all chat model integrations support the `streaming` parameter. If your model doesn't support it, use `disableStreaming: true` instead. This parameter is available on all chat models via the base class.
</Note>

See the [LangGraph streaming guide](/oss/javascript/langgraph/streaming#disable-streaming-for-specific-chat-models) for more details.

## Related

* [Frontend streaming](/oss/javascript/langchain/streaming/frontend) — Build React UIs with `useStream` for real-time agent interactions
* [Streaming with chat models](/oss/javascript/langchain/models#stream) — Stream tokens directly from a chat model without using an agent or graph
* [Streaming with human-in-the-loop](/oss/javascript/langchain/human-in-the-loop#streaming-with-hil) — Stream agent progress while handling interrupts for human review
* [LangGraph streaming](/oss/javascript/langgraph/streaming) — Advanced streaming options including `values`, `debug` modes, and subgraph streaming

***

<Callout icon="pen-to-square" iconType="regular">
  [Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/oss/langchain/streaming/overview.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).
</Callout>

<Tip icon="terminal" iconType="regular">
  [Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.
</Tip>

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.langchain.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Frontend

> Build generative UIs with real-time streaming from LangChain agents, LangGraph graphs, and custom APIs

The `useStream` React hook provides seamless integration with LangGraph streaming capabilities. It handles all the complexities of streaming, state management, and branching logic, letting you focus on building great generative UI experiences.

Key features:

* <Icon icon="messages" size={16} /> **Messages streaming** — Handle a stream of message chunks to form a complete message
* <Icon icon="arrows-rotate" size={16} /> **Automatic state management** — for messages, interrupts, loading states, and errors
* <Icon icon="code-branch" size={16} /> **Conversation branching** — Create alternate conversation paths from any point in the chat history
* <Icon icon="palette" size={16} /> **UI-agnostic design** — Bring your own components and styling

## Installation

Install the LangGraph SDK to use the `useStream` hook in your React application:

```bash  theme={null}
npm install @langchain/langgraph-sdk
```

## Basic usage

The `useStream` hook connects to any LangGraph graph, whether that's running on from your own endpoint, or deployed using [LangSmith deployments](/langsmith/deployments).

```tsx  theme={null}
import { useStream } from "@langchain/langgraph-sdk/react";

function Chat() {
  const stream = useStream({
    assistantId: "agent",
    // Local development
    apiUrl: "http://localhost:2024",
    // Production deployment (LangSmith hosted)
    // apiUrl: "https://your-deployment.us.langgraph.app"
  });

  const handleSubmit = (message: string) => {
    stream.submit({
      messages: [
        { content: message, type: "human" }
      ],
    });
  };

  return (
    <div>
      {stream.messages.map((message, idx) => (
        <div key={message.id ?? idx}>
          {message.type}: {message.content}
        </div>
      ))}

      {stream.isLoading && <div>Loading...</div>}
      {stream.error && <div>Error: {stream.error.message}</div>}
    </div>
  );
}
```

<Tip>
  Learn how to [deploy your agents to LangSmith](/oss/javascript/langchain/deploy) for production-ready hosting with built-in observability, authentication, and scaling.
</Tip>

<Accordion title="`useStream` parameters">
  <ParamField body="assistantId" type="string" required>
    The ID of the agent to connect to. When using LangSmith deployments, this must match the agent ID shown in your deployment dashboard. For custom API deployments or local development, this can be any string that your server uses to identify the agent.
  </ParamField>

  <ParamField body="apiUrl" type="string">
    The URL of the LangGraph server. Defaults to `http://localhost:2024` for local development.
  </ParamField>

  <ParamField body="apiKey" type="string">
    API key for authentication. Required when connecting to deployed agents on LangSmith.
  </ParamField>

  <ParamField body="threadId" type="string">
    Connect to an existing thread instead of creating a new one. Useful for resuming conversations.
  </ParamField>

  <ParamField body="onThreadId" type="(id: string) => void">
    Callback invoked when a new thread is created. Use this to persist the thread ID for later use.
  </ParamField>

  <ParamField body="reconnectOnMount" type="boolean | (() => Storage)">
    Automatically resume an ongoing run when the component mounts. Set to `true` to use session storage, or provide a custom storage function.
  </ParamField>

  <ParamField body="onCreated" type="(run: Run) => void">
    Callback invoked when a new run is created. Useful for persisting run metadata for resumption.
  </ParamField>

  <ParamField body="onError" type="(error: Error) => void">
    Callback invoked when an error occurs during streaming.
  </ParamField>

  <ParamField body="onFinish" type="(state: StateType, run?: Run) => void">
    Callback invoked when the stream completes successfully with the final state.
  </ParamField>

  <ParamField body="onCustomEvent" type="(data: unknown, context: { mutate }) => void">
    Handle custom events emitted from your agent using the `writer`. See [Custom streaming events](#custom-streaming-events).
  </ParamField>

  <ParamField body="onUpdateEvent" type="(data: unknown, context: { mutate }) => void">
    Handle state update events after each graph step.
  </ParamField>

  <ParamField body="onMetadataEvent" type="(metadata: { run_id, thread_id }) => void">
    Handle metadata events with run and thread information.
  </ParamField>

  <ParamField body="messagesKey" type="string" default="messages">
    The key in the graph state that contains the messages array.
  </ParamField>

  <ParamField body="throttle" type="boolean" default="true">
    Batch state updates for better rendering performance. Disable for immediate updates.
  </ParamField>

  <ParamField body="initialValues" type="StateType | null">
    Initial state values to display while the first stream is loading. Useful for showing cached thread data immediately.
  </ParamField>
</Accordion>

<Accordion title="`useStream` return values">
  <ParamField body="messages" type="Message[]">
    All messages in the current thread, including both human and AI messages.
  </ParamField>

  <ParamField body="values" type="StateType">
    The current graph state values. Type is inferred from the agent or graph type parameter.
  </ParamField>

  <ParamField body="isLoading" type="boolean">
    Whether a stream is currently in progress. Use this to show loading indicators.
  </ParamField>

  <ParamField body="error" type="Error | null">
    Any error that occurred during streaming. `null` when no error.
  </ParamField>

  <ParamField body="interrupt" type="Interrupt | undefined">
    Current interrupt requiring user input, such as human-in-the-loop approval requests.
  </ParamField>

  <ParamField body="toolCalls" type="ToolCallWithResult[]">
    All tool calls across all messages, with their results and state (`pending`, `completed`, or `error`).
  </ParamField>

  <ParamField body="submit" type="(input, options?) => Promise<void>">
    Submit new input to the agent. Pass `null` as input when resuming from an interrupt with a command. Options include `checkpoint` for branching, `optimisticValues` for optimistic updates, and `threadId` for optimistic thread creation.
  </ParamField>

  <ParamField body="stop" type="() => void">
    Stop the current stream immediately.
  </ParamField>

  <ParamField body="joinStream" type="(runId: string) => void">
    Resume an existing stream by run ID. Use with `onCreated` for manual stream resumption.
  </ParamField>

  <ParamField body="setBranch" type="(branch: string) => void">
    Switch to a different branch in the conversation history.
  </ParamField>

  <ParamField body="getToolCalls" type="(message) => ToolCall[]">
    Get all tool calls for a specific AI message.
  </ParamField>

  <ParamField body="getMessagesMetadata" type="(message) => MessageMetadata">
    Get metadata for a message, including streaming info like `langgraph_node` for identifying the source node, and `firstSeenState` for branching.
  </ParamField>

  <ParamField body="experimental_branchTree" type="BranchTree">
    Tree representation of the thread for advanced branching controls in non-message based graphs.
  </ParamField>
</Accordion>

## Thread management

Keep track of conversations with built-in thread management. You can access the current thread ID and get notified when new threads are created:

```tsx  theme={null}
import { useState } from "react";
import { useStream } from "@langchain/langgraph-sdk/react";

function Chat() {
  const [threadId, setThreadId] = useState<string | null>(null);

  const stream = useStream({
    apiUrl: "http://localhost:2024",
    assistantId: "agent",
    threadId: threadId,
    onThreadId: setThreadId,
  });

  // threadId is updated when a new thread is created
  // Store it in URL params or localStorage for persistence
}
```

We recommend storing the `threadId` to let users resume conversations after page refreshes.

### Resume after page refresh

The `useStream` hook can automatically resume an ongoing run upon mounting by setting `reconnectOnMount: true`. This is useful for continuing a stream after a page refresh, ensuring no messages and events generated during the downtime are lost.

```tsx  theme={null}
const stream = useStream({
  apiUrl: "http://localhost:2024",
  assistantId: "agent",
  reconnectOnMount: true,
});
```

By default the ID of the created run is stored in `window.sessionStorage`, which can be swapped by passing a custom storage function:

```tsx  theme={null}
const stream = useStream({
  apiUrl: "http://localhost:2024",
  assistantId: "agent",
  reconnectOnMount: () => window.localStorage,
});
```

For manual control over the resumption process, use the run callbacks to persist metadata and `joinStream` to resume:

```tsx  theme={null}
import { useStream } from "@langchain/langgraph-sdk/react";
import { useEffect, useRef } from "react";

function Chat({ threadId }: { threadId: string | null }) {
  const stream = useStream({
    apiUrl: "http://localhost:2024",
    assistantId: "agent",
    threadId,
    onCreated: (run) => {
      // Persist run ID when stream starts
      window.sessionStorage.setItem(`resume:${run.thread_id}`, run.run_id);
    },
    onFinish: (_, run) => {
      // Clean up when stream completes
      window.sessionStorage.removeItem(`resume:${run?.thread_id}`);
    },
  });

  // Resume stream on mount if there's a stored run ID
  const joinedThreadId = useRef<string | null>(null);
  useEffect(() => {
    if (!threadId) return;
    const runId = window.sessionStorage.getItem(`resume:${threadId}`);
    if (runId && joinedThreadId.current !== threadId) {
      stream.joinStream(runId);
      joinedThreadId.current = threadId;
    }
  }, [threadId]);

  const handleSubmit = (text: string) => {
    // Use streamResumable to ensure events aren't lost
    stream.submit(
      { messages: [{ type: "human", content: text }] },
      { streamResumable: true }
    );
  };
}
```

<Card title="Try the session persistence example" icon="rotate" href="https://github.com/langchain-ai/langgraphjs/tree/main/examples/ui-react/src/examples/session-persistence">
  See a complete implementation of stream resumption with `reconnectOnMount` and thread persistence in the `session-persistence` example.
</Card>

## Optimistic updates

You can optimistically update the client state before performing a network request, providing immediate feedback to the user:

```tsx  theme={null}
const stream = useStream({
  apiUrl: "http://localhost:2024",
  assistantId: "agent",
});

const handleSubmit = (text: string) => {
  const newMessage = { type: "human" as const, content: text };

  stream.submit(
    { messages: [newMessage] },
    {
      optimisticValues(prev) {
        const prevMessages = prev.messages ?? [];
        return { ...prev, messages: [...prevMessages, newMessage] };
      },
    }
  );
};
```

### Optimistic thread creation

Use the `threadId` option in `submit` to enable optimistic UI patterns where you need to know the thread ID before the thread is created:

```tsx  theme={null}
import { useState } from "react";
import { useStream } from "@langchain/langgraph-sdk/react";

function Chat() {
  const [threadId, setThreadId] = useState<string | null>(null);
  const [optimisticThreadId] = useState(() => crypto.randomUUID());

  const stream = useStream({
    apiUrl: "http://localhost:2024",
    assistantId: "agent",
    threadId,
    onThreadId: setThreadId,
  });

  const handleSubmit = (text: string) => {
    // Navigate immediately without waiting for thread creation
    window.history.pushState({}, "", `/threads/${optimisticThreadId}`);

    // Create thread with the predetermined ID
    stream.submit(
      { messages: [{ type: "human", content: text }] },
      { threadId: optimisticThreadId }
    );
  };
}
```

### Cached thread display

Use the `initialValues` option to display cached thread data immediately while the history is being loaded from the server:

```tsx  theme={null}
function Chat({ threadId, cachedData }) {
  const stream = useStream({
    apiUrl: "http://localhost:2024",
    assistantId: "agent",
    threadId,
    initialValues: cachedData?.values,
  });

  // Shows cached messages instantly, then updates when server responds
}
```

## Branching

Create alternate conversation paths by editing previous messages or regenerating AI responses. Use `getMessagesMetadata()` to access checkpoint information for branching:

<CodeGroup>
  ```tsx Chat.tsx theme={null}
  import { useStream } from "@langchain/langgraph-sdk/react";
  import { BranchSwitcher } from "./BranchSwitcher";

  function Chat() {
    const stream = useStream({
      apiUrl: "http://localhost:2024",
      assistantId: "agent",
    });

    return (
      <div>
        {stream.messages.map((message) => {
          const meta = stream.getMessagesMetadata(message);
          const parentCheckpoint = meta?.firstSeenState?.parent_checkpoint;

          return (
            <div key={message.id}>
              <div>{message.content as string}</div>

              {/* Edit human messages */}
              {message.type === "human" && (
                <button
                  onClick={() => {
                    const newContent = prompt("Edit message:", message.content as string);
                    if (newContent) {
                      stream.submit(
                        { messages: [{ type: "human", content: newContent }] },
                        { checkpoint: parentCheckpoint }
                      );
                    }
                  }}
                >
                  Edit
                </button>
              )}

              {/* Regenerate AI messages */}
              {message.type === "ai" && (
                <button
                  onClick={() => stream.submit(undefined, { checkpoint: parentCheckpoint })}
                >
                  Regenerate
                </button>
              )}

              {/* Switch between branches */}
              <BranchSwitcher
                branch={meta?.branch}
                branchOptions={meta?.branchOptions}
                onSelect={(branch) => stream.setBranch(branch)}
              />
            </div>
          );
        })}
      </div>
    );
  }
  ```

  ```tsx BranchSwitcher.tsx theme={null}
  /**
   * Component for navigating between conversation branches.
   * Shows the current branch position and allows switching between alternatives.
   */
  export function BranchSwitcher({
    branch,
    branchOptions,
    onSelect,
  }: {
    branch: string | undefined;
    branchOptions: string[] | undefined;
    onSelect: (branch: string) => void;
  }) {
    if (!branchOptions || !branch) return null;
    const index = branchOptions.indexOf(branch);

    return (
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={index <= 0}
          onClick={() => onSelect(branchOptions[index - 1])}
        >
          ←
        </button>
        <span>{index + 1} / {branchOptions.length}</span>
        <button
          type="button"
          disabled={index >= branchOptions.length - 1}
          onClick={() => onSelect(branchOptions[index + 1])}
        >
          →
        </button>
      </div>
    );
  }
  ```
</CodeGroup>

For advanced use cases, use the `experimental_branchTree` property to get the tree representation of the thread for non-message based graphs.

<Card title="Try the branching example" icon="code-branch" href="https://github.com/langchain-ai/langgraphjs/tree/main/examples/ui-react/src/examples/branching-chat">
  See a complete implementation of conversation branching with edit, regenerate, and branch switching in the `branching-chat` example.
</Card>

## Type-safe streaming

The `useStream` hook supports full type inference when used with agents created via [`createAgent`](https://reference.langchain.com/javascript/functions/langchain.index.createAgent.html) or graphs created with [`StateGraph`](https://reference.langchain.com/javascript/classes/_langchain_langgraph.index.StateGraph.html). Pass `typeof agent` or `typeof graph` as the type parameter to automatically infer tool call types.

### With `createAgent`

When using [`createAgent`](https://reference.langchain.com/javascript/functions/langchain.index.createAgent.html), tool call types are automatically inferred from the tools you register to your agent:

<CodeGroup>
  ```typescript agent.ts theme={null}
  import { createAgent, tool } from "langchain";
  import { z } from "zod";

  const getWeather = tool(
    async ({ location }) => `Weather in ${location}: Sunny, 72°F`,
    {
      name: "get_weather",
      description: "Get weather for a location",
      schema: z.object({
        location: z.string().describe("The city to get weather for"),
      }),
    }
  );

  export const agent = createAgent({
    model: "openai:gpt-4o-mini",
    tools: [getWeather],
  });
  ```

  ```tsx Chat.tsx theme={null}
  import { useStream } from "@langchain/langgraph-sdk/react";
  import type { agent } from "./agent";

  function Chat() {
    // Tool calls are automatically typed from the agent's tools
    const stream = useStream<typeof agent>({
      assistantId: "agent",
      apiUrl: "http://localhost:2024",
    });

    // stream.toolCalls[0].call.name is typed as "get_weather"
    // stream.toolCalls[0].call.args is typed as { location: string }
  }
  ```
</CodeGroup>

### With `StateGraph`

For custom [`StateGraph`](https://reference.langchain.com/javascript/classes/_langchain_langgraph.index.StateGraph.html) applications, the state types are inferred from the graph's annotation:

<CodeGroup>
  ```typescript graph.ts theme={null}
  import { StateGraph, MessagesAnnotation, START, END } from "@langchain/langgraph";
  import { ChatOpenAI } from "@langchain/openai";

  const model = new ChatOpenAI({ model: "gpt-4o-mini" });

  const workflow = new StateGraph(MessagesAnnotation)
    .addNode("agent", async (state) => {
      const response = await model.invoke(state.messages);
      return { messages: [response] };
    })
    .addEdge(START, "agent")
    .addEdge("agent", END);

  export const graph = workflow.compile();
  ```

  ```tsx Chat.tsx theme={null}
  import { useStream } from "@langchain/langgraph-sdk/react";
  import type { graph } from "./graph";

  function Chat() {
    // State types are automatically inferred from the graph
    const stream = useStream<typeof graph>({
      assistantId: "my-graph",
      apiUrl: "http://localhost:2024",
    });

    // stream.values is typed based on the graph's state annotation
  }
  ```
</CodeGroup>

### With Annotation types

If you're using LangGraph.js, you can reuse your graph's annotation types. Make sure to only import types to avoid importing the entire LangGraph.js runtime:

```tsx  theme={null}
import {
  Annotation,
  MessagesAnnotation,
  type StateType,
  type UpdateType,
} from "@langchain/langgraph/web";

const AgentState = Annotation.Root({
  ...MessagesAnnotation.spec,
  context: Annotation<string>(),
});

const stream = useStream<
  StateType<typeof AgentState.spec>,
  { UpdateType: UpdateType<typeof AgentState.spec> }
>({
  apiUrl: "http://localhost:2024",
  assistantId: "agent",
});
```

### Advanced type configuration

You can specify additional type parameters for interrupts, custom events, and configurable options:

```tsx  theme={null}
import type { Message } from "@langchain/langgraph-sdk";

type State = { messages: Message[]; context?: string };

const stream = useStream<
  State,
  {
    UpdateType: { messages: Message[] | Message; context?: string };
    InterruptType: string;
    CustomEventType: { type: "progress" | "debug"; payload: unknown };
    ConfigurableType: { model: string };
  }
>({
  apiUrl: "http://localhost:2024",
  assistantId: "agent",
});

// stream.interrupt is typed as string | undefined
// onCustomEvent receives typed events
```

## Rendering tool calls

Use `getToolCalls` to extract and render tool calls from AI messages. Tool calls include the call details, result (if completed), and state.

<CodeGroup>
  ```tsx Chat.tsx theme={null}
  import { useStream } from "@langchain/langgraph-sdk/react";
  import type { agent } from "./agent";
  import { ToolCallCard } from "./ToolCallCard";
  import { MessageBubble } from "./MessageBubble";

  function Chat() {
    const stream = useStream<typeof agent>({
      assistantId: "agent",
      apiUrl: "http://localhost:2024",
    });

    return (
      <div className="flex flex-col gap-4">
        {stream.messages.map((message, idx) => {
          if (message.type === "ai") {
            const toolCalls = stream.getToolCalls(message);

            if (toolCalls.length > 0) {
              return (
                <div key={message.id ?? idx} className="flex flex-col gap-2">
                  {toolCalls.map((toolCall) => (
                    <ToolCallCard key={toolCall.id} toolCall={toolCall} />
                  ))}
                </div>
              );
            }
          }

          return <MessageBubble key={message.id ?? idx} message={message} />;
        })}
      </div>
    );
  }
  ```

  ```tsx ToolCallCard.tsx theme={null}
  import type {
    ToolCallWithResult,
    ToolCallFromTool,
    ToolCallState,
    InferAgentToolCalls,
  } from "@langchain/langgraph-sdk/react";
  import type { ToolMessage } from "@langchain/langgraph-sdk";
  import type { agent } from "./agent";
  import type { getWeather } from "./tools";
  import { parseToolResult } from "./utils";
  import { WeatherCard } from "./WeatherCard";

  /**
   * Define tool call types for this component.
   * Use InferAgentToolCalls for agents or ToolCallFromTool for individual tools.
   */
  type AgentToolCalls = InferAgentToolCalls<typeof agent>;

  /**
   * Component that renders a tool call with its result.
   * Uses typed ToolCallWithResult for discriminated union narrowing.
   */
  export function ToolCallCard({
    toolCall,
  }: {
    toolCall: ToolCallWithResult<AgentToolCalls>;
  }) {
    const { call, result, state } = toolCall;

    // Type narrowing works when call.name is a literal type
    if (call.name === "get_weather") {
      return <WeatherCard call={call} result={result} state={state} />;
    }

    // Fallback for other tools
    return <GenericToolCallCard call={call} result={result} state={state} />;
  }
  ```

  ```tsx GenericToolCallCard.tsx theme={null}
  import type { ToolCallState } from "@langchain/langgraph-sdk/react";
  import type { ToolMessage } from "@langchain/langgraph-sdk";
  import { parseToolResult } from "./utils";

  /**
   * Generic fallback for unknown or unhandled tools.
   * Uses a simple type that works with any tool call.
   */
  export function GenericToolCallCard({
    call,
    result,
    state,
  }: {
    call: { name: string; args: Record<string, unknown> };
    result?: ToolMessage;
    state: ToolCallState;
  }) {
    const isLoading = state === "pending";
    const parsedResult = parseToolResult(result);

    return (
      <div className="bg-neutral-900 rounded-lg p-4 border border-neutral-800">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex-1">
            <div className="text-sm font-medium text-white font-mono">
              {call.name}
            </div>
            <div className="text-xs text-neutral-500">
              {isLoading ? "Processing..." : "Completed"}
            </div>
          </div>
        </div>
        <pre className="text-xs bg-black rounded p-2 mb-2 overflow-x-auto">
          {JSON.stringify(call.args, null, 2)}
        </pre>
        {result && (
          <div className="text-sm rounded-lg p-3 bg-black text-neutral-300">
            {parsedResult.content}
          </div>
        )}
      </div>
    );
  }
  ```

  ```tsx WeatherCard.tsx theme={null}
  import type { ToolCallFromTool, ToolCallState } from "@langchain/langgraph-sdk/react";
  import type { ToolMessage } from "@langchain/langgraph-sdk";
  import type { getWeather } from "./tools";
  import { parseToolResult } from "./utils";

  // Infer tool call type directly from the tool definition
  type GetWeatherToolCall = ToolCallFromTool<typeof getWeather>;

  /**
   * Weather-specific tool card with rich UI.
   * Uses ToolCallFromTool to infer args type from the tool schema.
   */
  export function WeatherCard({
    call,
    result,
    state,
  }: {
    call: GetWeatherToolCall;
    result?: ToolMessage;
    state: ToolCallState;
  }) {
    const isLoading = state === "pending";
    const parsedResult = parseToolResult(result);

    return (
      <div className="relative overflow-hidden rounded-xl">
        {/* Sky gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-600 to-indigo-600" />

        <div className="relative p-4">
          <div className="flex items-center gap-2 text-white/80 text-xs mb-3">
            {/* call.args is typed as { location: string } from the tool schema */}
            <span className="font-medium">{call.args.location}</span>
            {isLoading && <span className="ml-auto">Loading...</span>}
          </div>

          {parsedResult.status === "error" ? (
            <div className="bg-red-500/20 rounded-lg p-3 text-red-200 text-sm">
              {parsedResult.content}
            </div>
          ) : (
            <div className="text-white text-lg font-medium">
              {parsedResult.content || "Fetching weather..."}
            </div>
          )}
        </div>
      </div>
    );
  }
  ```

  ```typescript tools.ts theme={null}
  import { tool } from "@langchain/core/tools";
  import { z } from "zod";

  // Define the weather tool with a Zod schema
  export const getWeather = tool(
    async ({ location }) => {
      // Tool implementation
      return JSON.stringify({ status: "success", content: `Weather in ${location}: Sunny, 72°F` });
    },
    {
      name: "get_weather",
      description: "Get the current weather for a location",
      schema: z.object({
        location: z.string().describe("The city and state, e.g. San Francisco, CA"),
      }),
    }
  );
  ```

  ```typescript utils.ts theme={null}
  import type { ToolMessage } from "@langchain/langgraph-sdk";

  /**
   * Helper to parse tool result safely.
   * Tool results may be JSON strings or plain text.
   */
  export function parseToolResult(result?: ToolMessage): {
    status: string;
    content: string;
  } {
    if (!result) return { status: "pending", content: "" };
    try {
      return JSON.parse(result.content as string);
    } catch {
      return { status: "success", content: result.content as string };
    }
  }
  ```
</CodeGroup>

<Card title="Try the tool calling example" icon="hammer" href="https://github.com/langchain-ai/langgraphjs/tree/main/examples/ui-react/src/examples/tool-calling-agent">
  See a complete implementation of tool call rendering with weather, calculator, and note-taking tools in the `tool-calling-agent` example.
</Card>

## Custom streaming events

Stream custom data from your agent using the `writer` in your tools or nodes. Handle these events in the UI with the `onCustomEvent` callback.

<CodeGroup>
  ```typescript agent.ts theme={null}
  import { tool, type ToolRuntime } from "langchain";
  import { z } from "zod";

  // Define your custom event types
  interface ProgressData {
    type: "progress";
    id: string;
    message: string;
    progress: number;
  }

  const analyzeDataTool = tool(
    async ({ dataSource }, config: ToolRuntime) => {
      const steps = ["Connecting...", "Fetching...", "Processing...", "Done!"];

      for (let i = 0; i < steps.length; i++) {
        // Emit progress events during execution
        config.writer?.({
          type: "progress",
          id: `analysis-${Date.now()}`,
          message: steps[i],
          progress: ((i + 1) / steps.length) * 100,
        } satisfies ProgressData);

        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      return JSON.stringify({ result: "Analysis complete" });
    },
    {
      name: "analyze_data",
      description: "Analyze data with progress updates",
      schema: z.object({
        dataSource: z.string().describe("Data source to analyze"),
      }),
    }
  );
  ```

  ```tsx Chat.tsx theme={null}
  import { useState, useCallback } from "react";
  import { useStream } from "@langchain/langgraph-sdk/react";
  import type { agent } from "./agent";

  interface ProgressData {
    type: "progress";
    id: string;
    message: string;
    progress: number;
  }

  function isProgressData(data: unknown): data is ProgressData {
    return (
      typeof data === "object" &&
      data !== null &&
      "type" in data &&
      (data as ProgressData).type === "progress"
    );
  }

  function CustomStreamingUI() {
    const [progressData, setProgressData] = useState<Map<string, ProgressData>>(
      new Map()
    );

    const handleCustomEvent = useCallback((data: unknown) => {
      if (isProgressData(data)) {
        setProgressData((prev) => {
          const updated = new Map(prev);
          updated.set(data.id, data);
          return updated;
        });
      }
    }, []);

    const stream = useStream<typeof agent>({
      assistantId: "custom-streaming",
      apiUrl: "http://localhost:2024",
      onCustomEvent: handleCustomEvent,
    });

    return (
      <div>
        {/* Render progress cards */}
        {Array.from(progressData.values()).map((data) => (
          <div key={data.id} className="bg-neutral-800 rounded-lg p-4 mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-white">{data.message}</span>
              <span className="text-xs text-neutral-400">{data.progress}%</span>
            </div>
            <div className="w-full bg-neutral-700 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all"
                style={{ width: `${data.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }
  ```
</CodeGroup>

<Card title="Try the custom streaming example" icon="bolt" href="https://github.com/langchain-ai/langgraphjs/tree/main/examples/ui-react/src/examples/custom-streaming">
  See a complete implementation of custom events with progress bars, status badges, and file operation cards in the `custom-streaming` example.
</Card>

## Event handling

The `useStream` hook provides callback options that give you access to different types of streaming events. You don't need to explicitly configure stream modes—just pass callbacks for the event types you want to handle:

```tsx  theme={null}
const stream = useStream({
  apiUrl: "http://localhost:2024",
  assistantId: "agent",

  // Handle state updates after each graph step
  onUpdateEvent: (update, options) => {
    console.log("Graph update:", update);
  },

  // Handle custom events streamed from your graph
  onCustomEvent: (event, options) => {
    console.log("Custom event:", event);
  },

  // Handle metadata events with run/thread info
  onMetadataEvent: (metadata) => {
    console.log("Run ID:", metadata.run_id);
    console.log("Thread ID:", metadata.thread_id);
  },

  onError: (error) => {
    console.error("Stream error:", error);
  },

  onFinish: (state, options) => {
    console.log("Stream finished with final state:", state);
  },
});
```

### Available callbacks

| Callback          | Description                                                  | Stream mode |
| ----------------- | ------------------------------------------------------------ | ----------- |
| `onUpdateEvent`   | Called when a state update is received after each graph step | `updates`   |
| `onCustomEvent`   | Called when a custom event is received from your graph       | `custom`    |
| `onMetadataEvent` | Called with run and thread metadata                          | `metadata`  |
| `onError`         | Called when an error occurs                                  | -           |
| `onFinish`        | Called when the stream completes                             | -           |

## Multi-agent streaming

When working with multi-agent systems or graphs with multiple nodes, use message metadata to identify which node generated each message. This is particularly useful when multiple LLMs run in parallel and you want to display their outputs with distinct visual styling.

<CodeGroup>
  ```tsx Chat.tsx theme={null}
  import { useStream } from "@langchain/langgraph-sdk/react";
  import type { agent } from "./agent";
  import { MessageBubble } from "./MessageBubble";

  // Node configuration for visual display
  const NODE_CONFIG: Record<string, { label: string; color: string }> = {
    researcher_analytical: { label: "Analytical Research", color: "cyan" },
    researcher_creative: { label: "Creative Research", color: "purple" },
    researcher_practical: { label: "Practical Research", color: "emerald" },
  };

  function MultiAgentChat() {
    const stream = useStream<typeof agent>({
      assistantId: "parallel-research",
      apiUrl: "http://localhost:2024",
    });

    return (
      <div className="flex flex-col gap-4">
        {stream.messages.map((message, idx) => {
          if (message.type !== "ai") {
            return <MessageBubble key={message.id ?? idx} message={message} />;
          }

          // Get streaming metadata to identify the source node
          const metadata = stream.getMessagesMetadata?.(message);
          const nodeName =
            (metadata?.streamMetadata?.langgraph_node as string) ||
            (message as { name?: string }).name;

          const config = nodeName ? NODE_CONFIG[nodeName] : null;

          if (!config) {
            return <MessageBubble key={message.id ?? idx} message={message} />;
          }

          return (
            <div
              key={message.id ?? idx}
              className={`bg-${config.color}-950/30 border border-${config.color}-500/30 rounded-xl p-4`}
            >
              <div className={`text-sm font-semibold text-${config.color}-400 mb-2`}>
                {config.label}
              </div>
              <div className="text-neutral-200 whitespace-pre-wrap">
                {typeof message.content === "string" ? message.content : ""}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  ```

  ```typescript agent.ts theme={null}
  import { ChatOpenAI } from "@langchain/openai";
  import { StateGraph, START, END, Send } from "@langchain/langgraph";
  import { withLangGraph } from "@langchain/langgraph/zod";
  import { BaseMessage, AIMessage } from "@langchain/core/messages";
  import { z } from "zod";

  // Use different model instances for variety
  const analyticalModel = new ChatOpenAI({ model: "gpt-4o-mini", temperature: 0.3 });
  const creativeModel = new ChatOpenAI({ model: "gpt-4o-mini", temperature: 0.9 });
  const practicalModel = new ChatOpenAI({ model: "gpt-4o-mini", temperature: 0.5 });

  // Define the state schema
  const StateAnnotation = z.object({
    messages: withLangGraph(z.custom<BaseMessage[]>(), {
      reducer: {
        fn: (left: BaseMessage[], right: BaseMessage | BaseMessage[]) =>
          Array.isArray(right) ? left.concat(right) : left.concat([right]),
      },
      default: () => [],
    }),
    topic: z.string().default(""),
    analyticalResearch: z.string().default(""),
    creativeResearch: z.string().default(""),
    practicalResearch: z.string().default(""),
  });

  type State = z.infer<typeof StateAnnotation>;

  // Fan-out to parallel researchers
  function fanOutToResearchers(state: State): Send[] {
    return [
      new Send("researcher_analytical", state),
      new Send("researcher_creative", state),
      new Send("researcher_practical", state),
    ];
  }

  async function dispatcherNode(state: State): Promise<Partial<State>> {
    const lastMessage = state.messages.at(-1);
    const topic = typeof lastMessage?.content === "string" ? lastMessage.content : "";
    return { topic };
  }

  async function analyticalResearcherNode(state: State): Promise<Partial<State>> {
    const response = await analyticalModel.invoke([
      { role: "system", content: "You are an analytical research expert. Focus on data and evidence." },
      { role: "user", content: `Research: ${state.topic}` },
    ]);
    return {
      analyticalResearch: response.content as string,
      messages: [new AIMessage({ content: response.content as string, name: "researcher_analytical" })],
    };
  }

  // Similar nodes for creative and practical researchers...

  // Build the graph with parallel execution
  const workflow = new StateGraph(StateAnnotation)
    .addNode("dispatcher", dispatcherNode)
    .addNode("researcher_analytical", analyticalResearcherNode)
    .addNode("researcher_creative", creativeResearcherNode)
    .addNode("researcher_practical", practicalResearcherNode)
    .addEdge(START, "dispatcher")
    .addConditionalEdges("dispatcher", fanOutToResearchers)
    .addEdge("researcher_analytical", END)
    .addEdge("researcher_creative", END)
    .addEdge("researcher_practical", END);

  export const agent = workflow.compile();
  ```
</CodeGroup>

<Card title="Try the parallel research example" icon="users" href="https://github.com/langchain-ai/langgraphjs/tree/main/examples/ui-react/src/examples/parallel-research">
  See a complete implementation of multi-agent streaming with three parallel researchers and distinct visual styling in the `parallel-research` example.
</Card>

## Human-in-the-loop

Handle interrupts when the agent requires human approval for tool execution. Learn more in the [How to handle interrupts](/oss/javascript/langgraph/interrupts#pause-using-interrupt) guide.

<CodeGroup>
  ```tsx Chat.tsx theme={null}
  import { useState } from "react";
  import { useStream } from "@langchain/langgraph-sdk/react";
  import type { HITLRequest, HITLResponse } from "langchain";
  import type { agent } from "./agent";
  import { MessageBubble } from "./MessageBubble";

  function HumanInTheLoopChat() {
    const stream = useStream<typeof agent, { InterruptType: HITLRequest }>({
      assistantId: "human-in-the-loop",
      apiUrl: "http://localhost:2024",
    });

    const [isProcessing, setIsProcessing] = useState(false);

    // Type assertion for interrupt value
    const hitlRequest = stream.interrupt?.value as HITLRequest | undefined;

    const handleApprove = async (index: number) => {
      if (!hitlRequest) return;
      setIsProcessing(true);

      try {
        const decisions: HITLResponse["decisions"] =
          hitlRequest.actionRequests.map((_, i) =>
            i === index ? { type: "approve" } : { type: "approve" }
          );

        await stream.submit(null, {
          command: {
            resume: { decisions } as HITLResponse,
          },
        });
      } finally {
        setIsProcessing(false);
      }
    };

    const handleReject = async (index: number, reason: string) => {
      if (!hitlRequest) return;
      setIsProcessing(true);

      try {
        const decisions: HITLResponse["decisions"] =
          hitlRequest.actionRequests.map((_, i) =>
            i === index
              ? { type: "reject", message: reason }
              : { type: "reject", message: "Rejected along with other actions" }
          );

        await stream.submit(null, {
          command: {
            resume: { decisions } as HITLResponse,
          },
        });
      } finally {
        setIsProcessing(false);
      }
    };

    return (
      <div>
        {/* Render messages */}
        {stream.messages.map((message, idx) => (
          <MessageBubble key={message.id ?? idx} message={message} />
        ))}

        {/* Render approval UI when interrupted */}
        {hitlRequest && hitlRequest.actionRequests.length > 0 && (
          <div className="bg-amber-900/20 border border-amber-500/30 rounded-xl p-4 mt-4">
            <h3 className="text-amber-400 font-semibold mb-4">
              Action requires approval
            </h3>

            {hitlRequest.actionRequests.map((action, idx) => (
              <div
                key={idx}
                className="bg-neutral-900 rounded-lg p-4 mb-4 last:mb-0"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-mono text-white">
                    {action.name}
                  </span>
                </div>

                <pre className="text-xs bg-black rounded p-2 mb-3 overflow-x-auto">
                  {JSON.stringify(action.args, null, 2)}
                </pre>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(idx)}
                    disabled={isProcessing}
                    className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm rounded disabled:opacity-50"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(idx, "User rejected")}
                    disabled={isProcessing}
                    className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-sm rounded disabled:opacity-50"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  ```

  ```typescript agent.ts theme={null}
  import { createAgent, tool, humanInTheLoopMiddleware } from "langchain";
  import { ChatOpenAI } from "@langchain/openai";
  import { MemorySaver } from "@langchain/langgraph";
  import { z } from "zod";

  const model = new ChatOpenAI({ model: "gpt-4o-mini" });

  // Tool that requires human approval
  const sendEmail = tool(
    async ({ to, subject, body }) => {
      return {
        status: "success",
        content: `Email sent to ${to} with subject "${subject}"`,
      };
    },
    {
      name: "send_email",
      description: "Send an email. Requires human approval.",
      schema: z.object({
        to: z.string().describe("Recipient email address"),
        subject: z.string().describe("Email subject"),
        body: z.string().describe("Email body"),
      }),
    }
  );

  // Tool that requires approval with limited options
  const deleteFile = tool(
    async ({ path }) => {
      return { status: "success", content: `File "${path}" deleted` };
    },
    {
      name: "delete_file",
      description: "Delete a file. Requires human approval.",
      schema: z.object({
        path: z.string().describe("File path to delete"),
      }),
    }
  );

  // Safe tool - no approval needed
  const readFile = tool(
    async ({ path }) => {
      return { status: "success", content: `Contents of ${path}...` };
    },
    {
      name: "read_file",
      description: "Read file contents. No approval needed.",
      schema: z.object({
        path: z.string().describe("File path to read"),
      }),
    }
  );

  // Create agent with HITL middleware
  export const agent = createAgent({
    model,
    tools: [sendEmail, deleteFile, readFile],
    middleware: [
      humanInTheLoopMiddleware({
        interruptOn: {
          // Email requires all decision types
          send_email: {
            allowedDecisions: ["approve", "edit", "reject"],
            description: "📧 Review email before sending",
          },
          // Deletion only allows approve/reject
          delete_file: {
            allowedDecisions: ["approve", "reject"],
            description: "🗑️ Confirm file deletion",
          },
          // Reading is safe - auto-approved
          read_file: false,
        },
      }),
    ],
    // Required for HITL - persists state across interrupts
    checkpointer: new MemorySaver(),
  });
  ```
</CodeGroup>

<Card title="Try the human-in-the-loop example" icon="hand" href="https://github.com/langchain-ai/langgraphjs/tree/main/examples/ui-react/src/examples/human-in-the-loop">
  See a complete implementation of approval workflows with approve, reject, and edit actions in the `human-in-the-loop` example.
</Card>

## Reasoning models

<Warning>
  Extended reasoning/thinking support is currently experimental. The streaming interface for reasoning tokens varies by provider (OpenAI vs. Anthropic) and may change as abstractions are developed.
</Warning>

When using models with extended reasoning capabilities (like OpenAI's reasoning models or Anthropic's extended thinking), the thinking process is embedded in the message content. You'll need to extract and display it separately.

<CodeGroup>
  ```tsx Chat.tsx theme={null}
  import { useStream } from "@langchain/langgraph-sdk/react";
  import type { Message } from "@langchain/langgraph-sdk";
  import type { agent } from "./agent";
  import { getReasoningFromMessage, getTextContent } from "./utils";

  function ReasoningChat() {
    const stream = useStream<typeof agent>({
      assistantId: "reasoning-agent",
      apiUrl: "http://localhost:2024",
    });

    return (
      <div className="flex flex-col gap-4">
        {stream.messages.map((message, idx) => {
          if (message.type === "ai") {
            const reasoning = getReasoningFromMessage(message);
            const textContent = getTextContent(message);

            return (
              <div key={message.id ?? idx}>
                {/* Render reasoning bubble if present */}
                {reasoning && (
                  <div className="mb-4">
                    <div className="text-xs font-medium text-amber-400/80 mb-2">
                      Reasoning
                    </div>
                    <div className="bg-amber-950/50 border border-amber-500/20 rounded-2xl px-4 py-3">
                      <div className="text-sm text-amber-100/90 whitespace-pre-wrap">
                        {reasoning}
                      </div>
                    </div>
                  </div>
                )}

                {/* Render text content */}
                {textContent && (
                  <div className="text-neutral-100 whitespace-pre-wrap">
                    {textContent}
                  </div>
                )}
              </div>
            );
          }

          return <MessageBubble key={message.id ?? idx} message={message} />;
        })}

        {stream.isLoading && (
          <div className="flex items-center gap-2 text-amber-400/70">
            <span className="text-sm">Thinking...</span>
          </div>
        )}
      </div>
    );
  }
  ```

  ```typescript utils.ts theme={null}
  import type { Message, AIMessage } from "@langchain/langgraph-sdk";

  /**
   * Extracts reasoning/thinking content from an AI message.
   * Supports both OpenAI reasoning (additional_kwargs.reasoning.summary)
   * and Anthropic extended thinking (content blocks with type "thinking").
   */
  export function getReasoningFromMessage(message: Message): string | undefined {
    type MessageWithExtras = AIMessage & {
      additional_kwargs?: {
        reasoning?: {
          summary?: Array<{ type: string; text: string }>;
        };
      };
      contentBlocks?: Array<{ type: string; thinking?: string }>;
    };

    const msg = message as MessageWithExtras;

    // Check for OpenAI reasoning in additional_kwargs
    if (msg.additional_kwargs?.reasoning?.summary) {
      const content = msg.additional_kwargs.reasoning.summary
        .filter((item) => item.type === "summary_text")
        .map((item) => item.text)
        .join("");

      if (content.trim()) return content;
    }

    // Check for Anthropic thinking in contentBlocks
    if (msg.contentBlocks?.length) {
      const thinking = msg.contentBlocks
        .filter((b) => b.type === "thinking" && b.thinking)
        .map((b) => b.thinking)
        .join("\n");

      if (thinking) return thinking;
    }

    // Check for thinking in message.content array
    if (Array.isArray(msg.content)) {
      const thinking = msg.content
        .filter((b): b is { type: "thinking"; thinking: string } =>
          typeof b === "object" && b?.type === "thinking" && "thinking" in b
        )
        .map((b) => b.thinking)
        .join("\n");

      if (thinking) return thinking;
    }

    return undefined;
  }

  /**
   * Extracts text content from a message.
   */
  export function getTextContent(message: Message): string {
    if (typeof message.content === "string") return message.content;

    if (Array.isArray(message.content)) {
      return message.content
        .filter((c): c is { type: "text"; text: string } => c.type === "text")
        .map((c) => c.text)
        .join("");
    }

    return "";
  }
  ```
</CodeGroup>

<Card title="Try the reasoning example" icon="brain" href="https://github.com/langchain-ai/langgraphjs/tree/main/examples/ui-react/src/examples/reasoning-agent">
  See a complete implementation of reasoning token display with OpenAI and Anthropic models in the `reasoning-agent` example.
</Card>

## Custom state types

For custom LangGraph applications, embed your tool call types in your state's messages property.

```tsx  theme={null}
import { Message } from "@langchain/langgraph-sdk";
import { useStream } from "@langchain/langgraph-sdk/react";

// Define your tool call types as a discriminated union
type MyToolCalls =
  | { name: "search"; args: { query: string }; id?: string }
  | { name: "calculate"; args: { expression: string }; id?: string };

// Embed tool call types in your state's messages
interface MyGraphState {
  messages: Message<MyToolCalls>[];
  context?: string;
}

function CustomGraphChat() {
  const stream = useStream<MyGraphState>({
    assistantId: "my-graph",
    apiUrl: "http://localhost:2024",
  });

  // stream.values is typed as MyGraphState
  // stream.toolCalls[0].call.name is typed as "search" | "calculate"
}
```

You can also specify additional type configuration for interrupts and configurable options:

```tsx  theme={null}
interface MyGraphState {
  messages: Message<MyToolCalls>[];
}

function CustomGraphChat() {
  const stream = useStream<
    MyGraphState,
    {
      InterruptType: { question: string };
      ConfigurableType: { userId: string };
    }
  >({
    assistantId: "my-graph",
    apiUrl: "http://localhost:2024",
  });

  // stream.interrupt is typed as { question: string } | undefined
}
```

## Custom transport

For custom API endpoints or non-standard deployments, use the `transport` option with `FetchStreamTransport` to connect to any streaming API.

```tsx  theme={null}
import { useMemo } from "react";
import { useStream, FetchStreamTransport } from "@langchain/langgraph-sdk/react";

function CustomAPIChat({ apiKey }: { apiKey: string }) {
  // Create transport with custom request handling
  const transport = useMemo(() => {
    return new FetchStreamTransport({
      apiUrl: "/api/my-agent",
      onRequest: async (url: string, init: RequestInit) => {
        // Inject API key or other custom data into requests
        const customBody = JSON.stringify({
          ...(JSON.parse(init.body as string) || {}),
          apiKey,
        });

        return {
          ...init,
          body: customBody,
          headers: {
            ...init.headers,
            "X-Custom-Header": "value",
          },
        };
      },
    });
  }, [apiKey]);

  const stream = useStream({
    transport,
  });

  // Use stream as normal
  return (
    <div>
      {stream.messages.map((message, idx) => (
        <MessageBubble key={message.id ?? idx} message={message} />
      ))}
    </div>
  );
}
```

## Related

* [Streaming overview](/oss/javascript/langchain/streaming/overview) — Server-side streaming with LangChain agents
* [useStream API Reference](https://reference.langchain.com/javascript/functions/_langchain_langgraph-sdk.react.useStream.html) — Full API documentation
* [Agent Chat UI](/oss/javascript/langchain/ui) — Pre-built chat interface for LangGraph agents
* [Human-in-the-loop](/oss/javascript/langchain/human-in-the-loop) — Configuring interrupts for human review
* [Multi-agent systems](/oss/javascript/langchain/multi-agent) — Building agents with multiple LLMs

***

<Callout icon="pen-to-square" iconType="regular">
  [Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/oss/langchain/streaming/frontend.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).
</Callout>

<Tip icon="terminal" iconType="regular">
  [Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.
</Tip>

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.langchain.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Short-term memory

## Overview

Memory is a system that remembers information about previous interactions. For AI agents, memory is crucial because it lets them remember previous interactions, learn from feedback, and adapt to user preferences. As agents tackle more complex tasks with numerous user interactions, this capability becomes essential for both efficiency and user satisfaction.

Short term memory lets your application remember previous interactions within a single thread or conversation.

<Note>
  A thread organizes multiple interactions in a session, similar to the way email groups messages in a single conversation.
</Note>

Conversation history is the most common form of short-term memory. Long conversations pose a challenge to today's LLMs; a full history may not fit inside an LLM's context window, resulting in an context loss or errors.

Even if your model supports the full context length, most LLMs still perform poorly over long contexts. They get "distracted" by stale or off-topic content, all while suffering from slower response times and higher costs.

Chat models accept context using [messages](/oss/javascript/langchain/messages), which include instructions (a system message) and inputs (human messages). In chat applications, messages alternate between human inputs and model responses, resulting in a list of messages that grows longer over time. Because context windows are limited, many applications can benefit from using techniques to remove or "forget" stale information.

## Usage

To add short-term memory (thread-level persistence) to an agent, you need to specify a `checkpointer` when creating an agent.

<Info>
  LangChain's agent manages short-term memory as a part of your agent's state.

  By storing these in the graph's state, the agent can access the full context for a given conversation while maintaining separation between different threads.

  State is persisted to a database (or memory) using a checkpointer so the thread can be resumed at any time.

  Short-term memory updates when the agent is invoked or a step (like a tool call) is completed, and the state is read at the start of each step.
</Info>

```ts {highlight={2,4, 9,14}} theme={null}
import { createAgent } from "langchain";
import { MemorySaver } from "@langchain/langgraph";

const checkpointer = new MemorySaver();

const agent = createAgent({
    model: "claude-sonnet-4-5-20250929",
    tools: [],
    checkpointer,
});

await agent.invoke(
    { messages: [{ role: "user", content: "hi! i am Bob" }] },
    { configurable: { thread_id: "1" } }
);
```

### In production

In production, use a checkpointer backed by a database:

```ts  theme={null}
import { PostgresSaver } from "@langchain/langgraph-checkpoint-postgres";

const DB_URI = "postgresql://postgres:postgres@localhost:5442/postgres?sslmode=disable";
const checkpointer = PostgresSaver.fromConnString(DB_URI);
```

<Note>
  For more checkpointer options including SQLite, Postgres, and Azure Cosmos DB, see the [list of checkpointer libraries](/oss/javascript/langgraph/persistence#checkpointer-libraries) in the Persistence documentation.
</Note>

## Customizing agent memory

You can extend the agent state by creating custom middleware with a state schema. Custom state schemas can be passed using the `stateSchema` parameter in middleware.

```typescript  theme={null}
import * as z from "zod";
import { createAgent, createMiddleware } from "langchain";
import { MemorySaver } from "@langchain/langgraph";

const customStateSchema = z.object({  // [!code highlight]
    userId: z.string(),  // [!code highlight]
    preferences: z.record(z.string(), z.any()),  // [!code highlight]
});  // [!code highlight]

const stateExtensionMiddleware = createMiddleware({
    name: "StateExtension",
    stateSchema: customStateSchema,  // [!code highlight]
});

const checkpointer = new MemorySaver();
const agent = createAgent({
    model: "gpt-5",
    tools: [],
    middleware: [stateExtensionMiddleware],  // [!code highlight]
    checkpointer,
});

// Custom state can be passed in invoke
const result = await agent.invoke({
    messages: [{ role: "user", content: "Hello" }],
    userId: "user_123",  // [!code highlight]
    preferences: { theme: "dark" },  // [!code highlight]
});
```

## Common patterns

With [short-term memory](#add-short-term-memory) enabled, long conversations can exceed the LLM's context window. Common solutions are:

<CardGroup cols={2}>
  <Card title="Trim messages" icon="scissors" href="#trim-messages" arrow>
    Remove first or last N messages (before calling LLM)
  </Card>

  <Card title="Delete messages" icon="trash" href="#delete-messages" arrow>
    Delete messages from LangGraph state permanently
  </Card>

  <Card title="Summarize messages" icon="layer-group" href="#summarize-messages" arrow>
    Summarize earlier messages in the history and replace them with a summary
  </Card>

  <Card title="Custom strategies" icon="gears">
    Custom strategies (e.g., message filtering, etc.)
  </Card>
</CardGroup>

This allows the agent to keep track of the conversation without exceeding the LLM's context window.

### Trim messages

Most LLMs have a maximum supported context window (denominated in tokens).

One way to decide when to truncate messages is to count the tokens in the message history and truncate whenever it approaches that limit. If you're using LangChain, you can use the trim messages utility and specify the number of tokens to keep from the list, as well as the `strategy` (e.g., keep the last `maxTokens`) to use for handling the boundary.

To trim message history in an agent, use [`createMiddleware`](https://reference.langchain.com/javascript/functions/langchain.index.createMiddleware.html) with a `beforeModel` hook:

```typescript  theme={null}
import { RemoveMessage } from "@langchain/core/messages";
import { createAgent, createMiddleware } from "langchain";
import { MemorySaver, REMOVE_ALL_MESSAGES } from "@langchain/langgraph";

const trimMessages = createMiddleware({
  name: "TrimMessages",
  beforeModel: (state) => {
    const messages = state.messages;

    if (messages.length <= 3) {
      return; // No changes needed
    }

    const firstMsg = messages[0];
    const recentMessages =
      messages.length % 2 === 0 ? messages.slice(-3) : messages.slice(-4);
    const newMessages = [firstMsg, ...recentMessages];

    return {
      messages: [
        new RemoveMessage({ id: REMOVE_ALL_MESSAGES }),
        ...newMessages,
      ],
    };
  },
});

const checkpointer = new MemorySaver();
const agent = createAgent({
  model: "gpt-4o",
  tools: [],
  middleware: [trimMessages],
  checkpointer,
});
```

### Delete messages

You can delete messages from the graph state to manage the message history.

This is useful when you want to remove specific messages or clear the entire message history.

To delete messages from the graph state, you can use the `RemoveMessage`. For `RemoveMessage` to work, you need to use a state key with [`messagesStateReducer`](https://reference.langchain.com/javascript/functions/_langchain_langgraph.index.messagesStateReducer.html) [reducer](/oss/javascript/langgraph/graph-api#reducers), like `MessagesValue`.

To remove specific messages:

```typescript  theme={null}
import { RemoveMessage } from "@langchain/core/messages";

const deleteMessages = (state) => {
    const messages = state.messages;
    if (messages.length > 2) {
        // remove the earliest two messages
        return {
        messages: messages
            .slice(0, 2)
            .map((m) => new RemoveMessage({ id: m.id })),
        };
    }
};
```

<Warning>
  When deleting messages, **make sure** that the resulting message history is valid. Check the limitations of the LLM provider you're using. For example:

  * Some providers expect message history to start with a `user` message
  * Most providers require `assistant` messages with tool calls to be followed by corresponding `tool` result messages.
</Warning>

```typescript  theme={null}
import { RemoveMessage } from "@langchain/core/messages";
import { createAgent, createMiddleware } from "langchain";
import { MemorySaver } from "@langchain/langgraph";

const deleteOldMessages = createMiddleware({
  name: "DeleteOldMessages",
  afterModel: (state) => {
    const messages = state.messages;
    if (messages.length > 2) {
      // remove the earliest two messages
      return {
        messages: messages
          .slice(0, 2)
          .map((m) => new RemoveMessage({ id: m.id! })),
      };
    }
    return;
  },
});

const agent = createAgent({
  model: "gpt-4o",
  tools: [],
  systemPrompt: "Please be concise and to the point.",
  middleware: [deleteOldMessages],
  checkpointer: new MemorySaver(),
});

const config = { configurable: { thread_id: "1" } };

const streamA = await agent.stream(
  { messages: [{ role: "user", content: "hi! I'm bob" }] },
  { ...config, streamMode: "values" }
);
for await (const event of streamA) {
  const messageDetails = event.messages.map((message) => [
    message.getType(),
    message.content,
  ]);
  console.log(messageDetails);
}

const streamB = await agent.stream(
  {
    messages: [{ role: "user", content: "what's my name?" }],
  },
  { ...config, streamMode: "values" }
);
for await (const event of streamB) {
  const messageDetails = event.messages.map((message) => [
    message.getType(),
    message.content,
  ]);
  console.log(messageDetails);
}
```

```
[[ "human", "hi! I'm bob" ]]
[[ "human", "hi! I'm bob" ], [ "ai", "Hello, Bob! How can I assist you today?" ]]
[[ "human", "hi! I'm bob" ], [ "ai", "Hello, Bob! How can I assist you today?" ]]
[[ "human", "hi! I'm bob" ], [ "ai", "Hello, Bob! How can I assist you today" ], ["human", "what's my name?" ]]
[[ "human", "hi! I'm bob" ], [ "ai", "Hello, Bob! How can I assist you today?" ], ["human", "what's my name?"], [ "ai", "Your name is Bob, as you mentioned. How can I help you further?" ]]
[[ "human", "what's my name?" ], [ "ai", "Your name is Bob, as you mentioned. How can I help you further?" ]]
```

### Summarize messages

The problem with trimming or removing messages, as shown above, is that you may lose information from culling of the message queue.
Because of this, some applications benefit from a more sophisticated approach of summarizing the message history using a chat model.

<img src="https://mintcdn.com/langchain-5e9cc07a/ybiAaBfoBvFquMDz/oss/images/summary.png?fit=max&auto=format&n=ybiAaBfoBvFquMDz&q=85&s=c8ed3facdccd4ef5c7e52902c72ba938" alt="Summary" data-og-width="609" width="609" data-og-height="242" height="242" data-path="oss/images/summary.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/langchain-5e9cc07a/ybiAaBfoBvFquMDz/oss/images/summary.png?w=280&fit=max&auto=format&n=ybiAaBfoBvFquMDz&q=85&s=4208b9b0cc9f459f3dc4e5219918471b 280w, https://mintcdn.com/langchain-5e9cc07a/ybiAaBfoBvFquMDz/oss/images/summary.png?w=560&fit=max&auto=format&n=ybiAaBfoBvFquMDz&q=85&s=7acb77c081545f57042368f4e9d0c8cb 560w, https://mintcdn.com/langchain-5e9cc07a/ybiAaBfoBvFquMDz/oss/images/summary.png?w=840&fit=max&auto=format&n=ybiAaBfoBvFquMDz&q=85&s=2fcfdb0c481d2e1d361e76db763a41e5 840w, https://mintcdn.com/langchain-5e9cc07a/ybiAaBfoBvFquMDz/oss/images/summary.png?w=1100&fit=max&auto=format&n=ybiAaBfoBvFquMDz&q=85&s=4abdac693a562788aa0db8681bef8ea7 1100w, https://mintcdn.com/langchain-5e9cc07a/ybiAaBfoBvFquMDz/oss/images/summary.png?w=1650&fit=max&auto=format&n=ybiAaBfoBvFquMDz&q=85&s=40acfefa91dcb11b247a6e4a7705f22b 1650w, https://mintcdn.com/langchain-5e9cc07a/ybiAaBfoBvFquMDz/oss/images/summary.png?w=2500&fit=max&auto=format&n=ybiAaBfoBvFquMDz&q=85&s=8d765aaf7551e8b0fc2720de7d2ac2a8 2500w" />

To summarize message history in an agent, use the built-in [`summarizationMiddleware`](/oss/javascript/langchain/middleware#summarization):

```typescript  theme={null}
import { createAgent, summarizationMiddleware } from "langchain";
import { MemorySaver } from "@langchain/langgraph";

const checkpointer = new MemorySaver();

const agent = createAgent({
  model: "gpt-4o",
  tools: [],
  middleware: [
    summarizationMiddleware({
      model: "gpt-4o-mini",
      trigger: { tokens: 4000 },
      keep: { messages: 20 },
    }),
  ],
  checkpointer,
});

const config = { configurable: { thread_id: "1" } };
await agent.invoke({ messages: "hi, my name is bob" }, config);
await agent.invoke({ messages: "write a short poem about cats" }, config);
await agent.invoke({ messages: "now do the same but for dogs" }, config);
const finalResponse = await agent.invoke({ messages: "what's my name?" }, config);

console.log(finalResponse.messages.at(-1)?.content);
// Your name is Bob!
```

See [`summarizationMiddleware`](/oss/javascript/langchain/middleware#summarization) for more configuration options.

## Access memory

You can access and modify the short-term memory (state) of an agent in several ways:

### Tools

#### Read short-term memory in a tool

Access short term memory (state) in a tool using the `runtime` parameter (typed as `ToolRuntime`).

The `runtime` parameter is hidden from the tool signature (so the model doesn't see it), but the tool can access the state through it.

```typescript  theme={null}
import * as z from "zod";
import { createAgent, tool, type ToolRuntime } from "langchain";

const stateSchema = z.object({
  userId: z.string(),
});

const getUserInfo = tool(
  async (_, config: ToolRuntime<z.infer<typeof stateSchema>>) => {
    const userId = config.state.userId;
    return userId === "user_123" ? "John Doe" : "Unknown User";
  },
  {
    name: "get_user_info",
    description: "Get user info",
    schema: z.object({}),
  }
);

const agent = createAgent({
  model: "gpt-5-nano",
  tools: [getUserInfo],
  stateSchema,
});

const result = await agent.invoke(
  {
    messages: [{ role: "user", content: "what's my name?" }],
    userId: "user_123",
  },
  {
    context: {},
  }
);

console.log(result.messages.at(-1)?.content);
// Outputs: "Your name is John Doe."
```

#### Write short-term memory from tools

To modify the agent's short-term memory (state) during execution, you can return state updates directly from the tools.

This is useful for persisting intermediate results or making information accessible to subsequent tools or prompts.

```typescript  theme={null}
import * as z from "zod";
import { tool, createAgent, ToolMessage, type ToolRuntime } from "langchain";
import { Command } from "@langchain/langgraph";

const CustomState = z.object({
  userId: z.string().optional(),
});

const updateUserInfo = tool(
  async (_, config: ToolRuntime<typeof CustomState>) => {
    const userId = config.state.userId;
    const name = userId === "user_123" ? "John Smith" : "Unknown user";
    return new Command({
      update: {
        userName: name,
        // update the message history
        messages: [
          new ToolMessage({
            content: "Successfully looked up user information",
            tool_call_id: config.toolCall?.id ?? "",
          }),
        ],
      },
    });
  },
  {
    name: "update_user_info",
    description: "Look up and update user info.",
    schema: z.object({}),
  }
);

const greet = tool(
  async (_, config) => {
    const userName = config.context?.userName;
    return `Hello ${userName}!`;
  },
  {
    name: "greet",
    description: "Use this to greet the user once you found their info.",
    schema: z.object({}),
  }
);

const agent = createAgent({
  model: "openai:gpt-5-mini",
  tools: [updateUserInfo, greet],
  stateSchema: CustomState,
});

const result = await agent.invoke({
  messages: [{ role: "user", content: "greet the user" }],
  userId: "user_123",
});

console.log(result.messages.at(-1)?.content);
// Output: "Hello! I’m here to help — what would you like to do today?"
```

### Prompt

Access short term memory (state) in middleware to create dynamic prompts based on conversation history or custom state fields.

```typescript  theme={null}
import * as z from "zod";
import { createAgent, tool, dynamicSystemPromptMiddleware } from "langchain";

const contextSchema = z.object({
  userName: z.string(),
});
type ContextSchema = z.infer<typeof contextSchema>;

const getWeather = tool(
  async ({ city }) => {
    return `The weather in ${city} is always sunny!`;
  },
  {
    name: "get_weather",
    description: "Get user info",
    schema: z.object({
      city: z.string(),
    }),
  }
);

const agent = createAgent({
  model: "gpt-5-nano",
  tools: [getWeather],
  contextSchema,
  middleware: [
    dynamicSystemPromptMiddleware<ContextSchema>((_, config) => {
      return `You are a helpful assistant. Address the user as ${config.context?.userName}.`;
    }),
  ],
});

const result = await agent.invoke(
  {
    messages: [{ role: "user", content: "What is the weather in SF?" }],
  },
  {
    context: {
      userName: "John Smith",
    },
  }
);

for (const message of result.messages) {
  console.log(message);
}
/**
 * HumanMessage {
 *   "content": "What is the weather in SF?",
 *   // ...
 * }
 * AIMessage {
 *   // ...
 *   "tool_calls": [
 *     {
 *       "name": "get_weather",
 *       "args": {
 *         "city": "San Francisco"
 *       },
 *       "type": "tool_call",
 *       "id": "call_tCidbv0apTpQpEWb3O2zQ4Yx"
 *     }
 *   ],
 *   // ...
 * }
 * ToolMessage {
 *   "content": "The weather in San Francisco is always sunny!",
 *   "tool_call_id": "call_tCidbv0apTpQpEWb3O2zQ4Yx"
 *   // ...
 * }
 * AIMessage {
 *   "content": "John Smith, here's the latest: The weather in San Francisco is always sunny!\n\nIf you'd like more details (temperature, wind, humidity) or a forecast for the next few days, I can pull that up. What would you like?",
 *   // ...
 * }
 */
```

### Before model

```mermaid  theme={null}
%%{
    init: {
        "fontFamily": "monospace",
        "flowchart": {
        "curve": "basis"
        },
        "themeVariables": {"edgeLabelBackground": "transparent"}
    }
}%%
graph TD
    S(["\_\_start\_\_"])
    PRE(before_model)
    MODEL(model)
    TOOLS(tools)
    END(["\_\_end\_\_"])
    S --> PRE
    PRE --> MODEL
    MODEL -.-> TOOLS
    MODEL -.-> END
    TOOLS --> PRE
    classDef blueHighlight fill:#0a1c25,stroke:#0a455f,color:#bae6fd;
    class S blueHighlight;
    class END blueHighlight;
```

```typescript  theme={null}
import { RemoveMessage } from "@langchain/core/messages";
import { createAgent, createMiddleware, trimMessages } from "langchain";
import { MemorySaver } from "@langchain/langgraph";
import { REMOVE_ALL_MESSAGES } from "@langchain/langgraph";

const trimMessageHistory = createMiddleware({
  name: "TrimMessages",
  beforeModel: async (state) => {
    const trimmed = await trimMessages(state.messages, {
      maxTokens: 384,
      strategy: "last",
      startOn: "human",
      endOn: ["human", "tool"],
      tokenCounter: (msgs) => msgs.length,
    });
    return {
      messages: [new RemoveMessage({ id: REMOVE_ALL_MESSAGES }), ...trimmed],
    };
  },
});

const checkpointer = new MemorySaver();
const agent = createAgent({
  model: "gpt-5-nano",
  tools: [],
  middleware: [trimMessageHistory],
  checkpointer,
});
```

### After model

```mermaid  theme={null}
%%{
    init: {
        "fontFamily": "monospace",
        "flowchart": {
        "curve": "basis"
        },
        "themeVariables": {"edgeLabelBackground": "transparent"}
    }
}%%
graph TD
    S(["\_\_start\_\_"])
    MODEL(model)
    POST(after_model)
    TOOLS(tools)
    END(["\_\_end\_\_"])
    S --> MODEL
    MODEL --> POST
    POST -.-> END
    POST -.-> TOOLS
    TOOLS --> MODEL
    classDef blueHighlight fill:#0a1c25,stroke:#0a455f,color:#bae6fd;
    class S blueHighlight;
    class END blueHighlight;
    class POST greenHighlight;
```

```typescript  theme={null}
import { RemoveMessage } from "@langchain/core/messages";
import { createAgent, createMiddleware } from "langchain";
import { REMOVE_ALL_MESSAGES } from "@langchain/langgraph";

const validateResponse = createMiddleware({
  name: "ValidateResponse",
  afterModel: (state) => {
    const lastMessage = state.messages.at(-1)?.content;
    if (
      typeof lastMessage === "string" &&
      lastMessage.toLowerCase().includes("confidential")
    ) {
      return {
        messages: [
          new RemoveMessage({ id: REMOVE_ALL_MESSAGES }),
        ],
      };
    }
    return;
  },
});

const agent = createAgent({
  model: "gpt-5-nano",
  tools: [],
  middleware: [validateResponse],
});
```

***

<Callout icon="pen-to-square" iconType="regular">
  [Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/oss/langchain/short-term-memory.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).
</Callout>

<Tip icon="terminal" iconType="regular">
  [Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.
</Tip>

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.langchain.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Structured output

Structured output allows agents to return data in a specific, predictable format. Instead of parsing natural language responses, you get typed structured data.

LangChain's prebuilt ReAct agent `createAgent` handles structured output automatically. The user sets their desired structured output schema, and when the model generates the structured data, it's captured, validated, and returned in the `structuredResponse` key of the agent's state.

```ts  theme={null}
type ResponseFormat = (
    | ZodSchema<StructuredResponseT> // a Zod schema
    | Record<string, unknown> // a JSON Schema
)

const agent = createAgent({
    // ...
    responseFormat: ResponseFormat | ResponseFormat[]
})
```

## Response format

Controls how the agent returns structured data. You can provide either a Zod object or JSON schema. By default, the agent uses a tool calling strategy, in which the output is created by an additional tool call. Certain models support native structured output, in which case the agent will use that strategy instead.

You can control the behavior by wrapping `ResponseFormat` in a `toolStrategy` or `providerStrategy` function call:

```ts  theme={null}
import { toolStrategy, providerStrategy } from "langchain";

const agent = createAgent({
    // use a provider strategy if supported by the model
    responseFormat: providerStrategy(z.object({ ... }))
    // or enforce a tool strategy
    responseFormat: toolStrategy(z.object({ ... }))
})
```

The structured response is returned in the `structuredResponse` key of the agent's final state.

<Tip>
  Support for native structured output features is read dynamically from the model's [profile data](/oss/javascript/langchain/models#model-profiles) if using `langchain>=1.1`. If data are not available, use another condition or specify manually:

  ```typescript  theme={null}
  const customProfile: ModelProfile = {
      structuredOutput: true,
      // ...
  }
  const model = await initChatModel("...", { profile: customProfile });
  ```

  If tools are specified, the model must support simultaneous use of tools and structured output.
</Tip>

## Provider strategy

Some model providers support structured output natively through their APIs (e.g. OpenAI, xAI (Grok), Gemini, Anthropic (Claude)). This is the most reliable method when available.

To use this strategy, configure a `ProviderStrategy`:

```ts  theme={null}
function providerStrategy<StructuredResponseT>(
    schema: ZodSchema<StructuredResponseT> | JsonSchemaFormat
): ProviderStrategy<StructuredResponseT>
```

<ParamField path="schema" required>
  The schema defining the structured output format. Supports:

  * **Zod Schema**: A zod schema
  * **JSON Schema**: A JSON schema object
</ParamField>

LangChain automatically uses `ProviderStrategy` when you pass a schema type directly to `createAgent.responseFormat` and the model supports native structured output:

<CodeGroup>
  ```ts Zod Schema theme={null}
  import * as z from "zod";
  import { createAgent, providerStrategy } from "langchain";

  const ContactInfo = z.object({
      name: z.string().describe("The name of the person"),
      email: z.string().describe("The email address of the person"),
      phone: z.string().describe("The phone number of the person"),
  });

  const agent = createAgent({
      model: "gpt-5",
      tools: [],
      responseFormat: providerStrategy(ContactInfo)
  });

  const result = await agent.invoke({
      messages: [{"role": "user", "content": "Extract contact info from: John Doe, john@example.com, (555) 123-4567"}]
  });

  console.log(result.structuredResponse);
  // { name: "John Doe", email: "john@example.com", phone: "(555) 123-4567" }
  ```

  ```ts JSON Schema theme={null}
  import { createAgent, providerStrategy } from "langchain";

  const contactInfoSchema = {
      "type": "object",
      "description": "Contact information for a person.",
      "properties": {
          "name": {"type": "string", "description": "The name of the person"},
          "email": {"type": "string", "description": "The email address of the person"},
          "phone": {"type": "string", "description": "The phone number of the person"}
      },
      "required": ["name", "email", "phone"]
  }

  const agent = createAgent({
      model: "gpt-5",
      tools: [],
      responseFormat: providerStrategy(contactInfoSchema)
  });

  const result = await agent.invoke({
      messages: [{"role": "user", "content": "Extract contact info from: John Doe, john@example.com, (555) 123-4567"}]
  });

  console.log(result.structuredResponse);
  // { name: "John Doe", email: "john@example.com", phone: "(555) 123-4567" }
  ```
</CodeGroup>

Provider-native structured output provides high reliability and strict validation because the model provider enforces the schema. Use it when available.

<Note>
  If the provider natively supports structured output for your model choice, it is functionally equivalent to write `responseFormat: contactInfoSchema` instead of `responseFormat: providerStrategy(contactInfoSchema)`.

  In either case, if structured output is not supported, the agent will fall back to a tool calling strategy.
</Note>

## Tool calling strategy

For models that don't support native structured output, LangChain uses tool calling to achieve the same result. This works with all models that support tool calling (most modern models).

To use this strategy, configure a `ToolStrategy`:

```ts  theme={null}
function toolStrategy<StructuredResponseT>(
    responseFormat:
        | JsonSchemaFormat
        | ZodSchema<StructuredResponseT>
        | (ZodSchema<StructuredResponseT> | JsonSchemaFormat)[]
    options?: ToolStrategyOptions
): ToolStrategy<StructuredResponseT>
```

<ParamField path="schema" required>
  The schema defining the structured output format. Supports:

  * **Zod Schema**: A zod schema
  * **JSON Schema**: A JSON schema object
</ParamField>

<ParamField path="options.toolMessageContent">
  Custom content for the tool message returned when structured output is generated.
  If not provided, defaults to a message showing the structured response data.
</ParamField>

<ParamField path="options.handleError">
  Options parameter containing an optional `handleError` parameter for customizing the error handling strategy.

  * **`true`**: Catch all errors with default error template (default)
  * **`False`**: No retry, let exceptions propagate
  * **`(error: ToolStrategyError) => string | Promise<string>`**: retry with the provided message or throw the error
</ParamField>

<CodeGroup>
  ```ts Zod Schema theme={null}
  import * as z from "zod";
  import { createAgent, toolStrategy } from "langchain";

  const ProductReview = z.object({
      rating: z.number().min(1).max(5).optional(),
      sentiment: z.enum(["positive", "negative"]),
      keyPoints: z.array(z.string()).describe("The key points of the review. Lowercase, 1-3 words each."),
  });

  const agent = createAgent({
      model: "gpt-5",
      tools: [],
      responseFormat: toolStrategy(ProductReview)
  })

  const result = await agent.invoke({
      "messages": [{"role": "user", "content": "Analyze this review: 'Great product: 5 out of 5 stars. Fast shipping, but expensive'"}]
  })

  console.log(result.structuredResponse);
  // { "rating": 5, "sentiment": "positive", "keyPoints": ["fast shipping", "expensive"] }
  ```

  ```ts JSON Schema theme={null}
  import { createAgent, toolStrategy } from "langchain";

  const productReviewSchema = {
      "type": "object",
      "description": "Analysis of a product review.",
      "properties": {
          "rating": {
              "type": ["integer", "null"],
              "description": "The rating of the product (1-5)",
              "minimum": 1,
              "maximum": 5
          },
          "sentiment": {
              "type": "string",
              "enum": ["positive", "negative"],
              "description": "The sentiment of the review"
          },
          "key_points": {
              "type": "array",
              "items": {"type": "string"},
              "description": "The key points of the review"
          }
      },
      "required": ["sentiment", "key_points"]
  }

  const agent = createAgent({
      model: "gpt-5",
      tools: [],
      responseFormat: toolStrategy(productReviewSchema)
  });

  const result = await agent.invoke({
      messages: [{"role": "user", "content": "Analyze this review: 'Great product: 5 out of 5 stars. Fast shipping, but expensive'"}]
  })

  console.log(result.structuredResponse);
  // { "rating": 5, "sentiment": "positive", "keyPoints": ["fast shipping", "expensive"] }
  ```

  ```ts Union Types theme={null}
  import * as z from "zod";
  import { createAgent, toolStrategy } from "langchain";

  const ProductReview = z.object({
      rating: z.number().min(1).max(5).optional(),
      sentiment: z.enum(["positive", "negative"]),
      keyPoints: z.array(z.string()).describe("The key points of the review. Lowercase, 1-3 words each."),
  });

  const CustomerComplaint = z.object({
      issueType: z.enum(["product", "service", "shipping", "billing"]),
      severity: z.enum(["low", "medium", "high"]),
      description: z.string().describe("Brief description of the complaint"),
  });

  const agent = createAgent({
      model: "gpt-5",
      tools: [],
      responseFormat: toolStrategy([ProductReview, CustomerComplaint])
  });

  const result = await agent.invoke({
      messages: [{"role": "user", "content": "Analyze this review: 'Great product: 5 out of 5 stars. Fast shipping, but expensive'"}]
  })

  console.log(result.structuredResponse);
  // { "rating": 5, "sentiment": "positive", "keyPoints": ["fast shipping", "expensive"] }
  ```
</CodeGroup>

### Custom tool message content

The `toolMessageContent` parameter allows you to customize the message that appears in the conversation history when structured output is generated:

```ts  theme={null}
import * as z from "zod";
import { createAgent, toolStrategy } from "langchain";

const MeetingAction = z.object({
    task: z.string().describe("The specific task to be completed"),
    assignee: z.string().describe("Person responsible for the task"),
    priority: z.enum(["low", "medium", "high"]).describe("Priority level"),
});

const agent = createAgent({
    model: "gpt-5",
    tools: [],
    responseFormat: toolStrategy(MeetingAction, {
        toolMessageContent: "Action item captured and added to meeting notes!"
    })
});

const result = await agent.invoke({
    messages: [{"role": "user", "content": "From our meeting: Sarah needs to update the project timeline as soon as possible"}]
});

console.log(result);
/**
 * {
 *   messages: [
 *     { role: "user", content: "From our meeting: Sarah needs to update the project timeline as soon as possible" },
 *     { role: "assistant", content: "Action item captured and added to meeting notes!", tool_calls: [ { name: "MeetingAction", args: { task: "update the project timeline", assignee: "Sarah", priority: "high" }, id: "call_456" } ] },
 *     { role: "tool", content: "Action item captured and added to meeting notes!", tool_call_id: "call_456", name: "MeetingAction" }
 *   ],
 *   structuredResponse: { task: "update the project timeline", assignee: "Sarah", priority: "high" }
 * }
 */
```

Without `toolMessageContent`, we'd see:

```ts  theme={null}
# console.log(result);
/**
 * {
 *   messages: [
 *     ...
 *     { role: "tool", content: "Returning structured response: {'task': 'update the project timeline', 'assignee': 'Sarah', 'priority': 'high'}", tool_call_id: "call_456", name: "MeetingAction" }
 *   ],
 *   structuredResponse: { task: "update the project timeline", assignee: "Sarah", priority: "high" }
 * }
 */
```

### Error handling

Models can make mistakes when generating structured output via tool calling. LangChain provides intelligent retry mechanisms to handle these errors automatically.

#### Multiple structured outputs error

When a model incorrectly calls multiple structured output tools, the agent provides error feedback in a [`ToolMessage`](https://reference.langchain.com/javascript/classes/_langchain_core.messages.ToolMessage.html) and prompts the model to retry:

```ts  theme={null}
import * as z from "zod";
import { createAgent, toolStrategy } from "langchain";

const ContactInfo = z.object({
    name: z.string().describe("Person's name"),
    email: z.string().describe("Email address"),
});

const EventDetails = z.object({
    event_name: z.string().describe("Name of the event"),
    date: z.string().describe("Event date"),
});

const agent = createAgent({
    model: "gpt-5",
    tools: [],
    responseFormat: toolStrategy([ContactInfo, EventDetails]),
});

const result = await agent.invoke({
    messages: [
        {
        role: "user",
        content:
            "Extract info: John Doe (john@email.com) is organizing Tech Conference on March 15th",
        },
    ],
});

console.log(result);

/**
 * {
 *   messages: [
 *     { role: "user", content: "Extract info: John Doe (john@email.com) is organizing Tech Conference on March 15th" },
 *     { role: "assistant", content: "", tool_calls: [ { name: "ContactInfo", args: { name: "John Doe", email: "john@email.com" }, id: "call_1" }, { name: "EventDetails", args: { event_name: "Tech Conference", date: "March 15th" }, id: "call_2" } ] },
 *     { role: "tool", content: "Error: Model incorrectly returned multiple structured responses (ContactInfo, EventDetails) when only one is expected.\n Please fix your mistakes.", tool_call_id: "call_1", name: "ContactInfo" },
 *     { role: "tool", content: "Error: Model incorrectly returned multiple structured responses (ContactInfo, EventDetails) when only one is expected.\n Please fix your mistakes.", tool_call_id: "call_2", name: "EventDetails" },
 *     { role: "assistant", content: "", tool_calls: [ { name: "ContactInfo", args: { name: "John Doe", email: "john@email.com" }, id: "call_3" } ] },
 *     { role: "tool", content: "Returning structured response: {'name': 'John Doe', 'email': 'john@email.com'}", tool_call_id: "call_3", name: "ContactInfo" }
 *   ],
 *   structuredResponse: { name: "John Doe", email: "john@email.com" }
 * }
 */
```

#### Schema validation error

When structured output doesn't match the expected schema, the agent provides specific error feedback:

```ts  theme={null}
import * as z from "zod";
import { createAgent, toolStrategy } from "langchain";

const ProductRating = z.object({
    rating: z.number().min(1).max(5).describe("Rating from 1-5"),
    comment: z.string().describe("Review comment"),
});

const agent = createAgent({
    model: "gpt-5",
    tools: [],
    responseFormat: toolStrategy(ProductRating),
});

const result = await agent.invoke({
    messages: [
        {
        role: "user",
        content: "Parse this: Amazing product, 10/10!",
        },
    ],
});

console.log(result);

/**
 * {
 *   messages: [
 *     { role: "user", content: "Parse this: Amazing product, 10/10!" },
 *     { role: "assistant", content: "", tool_calls: [ { name: "ProductRating", args: { rating: 10, comment: "Amazing product" }, id: "call_1" } ] },
 *     { role: "tool", content: "Error: Failed to parse structured output for tool 'ProductRating': 1 validation error for ProductRating\nrating\n  Input should be less than or equal to 5 [type=less_than_equal, input_value=10, input_type=int].\n Please fix your mistakes.", tool_call_id: "call_1", name: "ProductRating" },
 *     { role: "assistant", content: "", tool_calls: [ { name: "ProductRating", args: { rating: 5, comment: "Amazing product" }, id: "call_2" } ] },
 *     { role: "tool", content: "Returning structured response: {'rating': 5, 'comment': 'Amazing product'}", tool_call_id: "call_2", name: "ProductRating" }
 *   ],
 *   structuredResponse: { rating: 5, comment: "Amazing product" }
 * }
 */
```

#### Error handling strategies

You can customize how errors are handled using the `handleErrors` parameter:

**Custom error message:**

```ts  theme={null}
const responseFormat = toolStrategy(ProductRating, {
    handleError: "Please provide a valid rating between 1-5 and include a comment."
)

// Error message becomes:
// { role: "tool", content: "Please provide a valid rating between 1-5 and include a comment." }
```

**Handle specific exceptions only:**

```ts  theme={null}
import { ToolInputParsingException } from "@langchain/core/tools";

const responseFormat = toolStrategy(ProductRating, {
    handleError: (error: ToolStrategyError) => {
        if (error instanceof ToolInputParsingException) {
        return "Please provide a valid rating between 1-5 and include a comment.";
        }
        return error.message;
    }
)

// Only validation errors get retried with default message:
// { role: "tool", content: "Error: Failed to parse structured output for tool 'ProductRating': ...\n Please fix your mistakes." }
```

**Handle multiple exception types:**

```ts  theme={null}
const responseFormat = toolStrategy(ProductRating, {
    handleError: (error: ToolStrategyError) => {
        if (error instanceof ToolInputParsingException) {
        return "Please provide a valid rating between 1-5 and include a comment.";
        }
        if (error instanceof CustomUserError) {
        return "This is a custom user error.";
        }
        return error.message;
    }
)
```

**No error handling:**

```ts  theme={null}
const responseFormat = toolStrategy(ProductRating, {
    handleError: false  // All errors raised
)
```

***

<Callout icon="pen-to-square" iconType="regular">
  [Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/oss/langchain/structured-output.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).
</Callout>

<Tip icon="terminal" iconType="regular">
  [Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.
</Tip>

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.langchain.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Custom middleware

Build custom middleware by implementing hooks that run at specific points in the agent execution flow.

## Hooks

Middleware provides two styles of hooks to intercept agent execution:

<CardGroup cols={2}>
  <Card title="Node-style hooks" icon="share-nodes" href="#node-style-hooks">
    Run sequentially at specific execution points.
  </Card>

  <Card title="Wrap-style hooks" icon="container-storage" href="#wrap-style-hooks">
    Run around each model or tool call.
  </Card>
</CardGroup>

### Node-style hooks

Run sequentially at specific execution points. Use for logging, validation, and state updates.

**Available hooks:**

* `beforeAgent` - Before agent starts (once per invocation)
* `beforeModel` - Before each model call
* `afterModel` - After each model response
* `afterAgent` - After agent completes (once per invocation)

**Example:**

```typescript  theme={null}
import { createMiddleware, AIMessage } from "langchain";

const createMessageLimitMiddleware = (maxMessages: number = 50) => {
  return createMiddleware({
    name: "MessageLimitMiddleware",
    beforeModel: (state) => {
      if (state.messages.length === maxMessages) {
        return {
          messages: [new AIMessage("Conversation limit reached.")],
          jumpTo: "end",
        };
      }
      return;
    },
    afterModel: (state) => {
      const lastMessage = state.messages[state.messages.length - 1];
      console.log(`Model returned: ${lastMessage.content}`);
      return;
    },
  });
};
```

### Wrap-style hooks

Intercept execution and control when the handler is called. Use for retries, caching, and transformation.

You decide if the handler is called zero times (short-circuit), once (normal flow), or multiple times (retry logic).

**Available hooks:**

* `wrapModelCall` - Around each model call
* `wrapToolCall` - Around each tool call

**Example:**

```typescript  theme={null}
import { createMiddleware } from "langchain";

const createRetryMiddleware = (maxRetries: number = 3) => {
  return createMiddleware({
    name: "RetryMiddleware",
    wrapModelCall: (request, handler) => {
      for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
          return handler(request);
        } catch (e) {
          if (attempt === maxRetries - 1) {
            throw e;
          }
          console.log(`Retry ${attempt + 1}/${maxRetries} after error: ${e}`);
        }
      }
      throw new Error("Unreachable");
    },
  });
};
```

## Create middleware

Use the `createMiddleware` function to define custom middleware:

```typescript  theme={null}
import { createMiddleware } from "langchain";

const loggingMiddleware = createMiddleware({
  name: "LoggingMiddleware",
  beforeModel: (state) => {
    console.log(`About to call model with ${state.messages.length} messages`);
    return;
  },
  afterModel: (state) => {
    const lastMessage = state.messages[state.messages.length - 1];
    console.log(`Model returned: ${lastMessage.content}`);
    return;
  },
});
```

## Custom state schema

Middleware can extend the agent's state with custom properties. This enables middleware to:

* **Track state across execution**: Maintain counters, flags, or other values that persist throughout the agent's execution lifecycle

* **Share data between hooks**: Pass information from `beforeModel` to `afterModel` or between different middleware instances

* **Implement cross-cutting concerns**: Add functionality like rate limiting, usage tracking, user context, or audit logging without modifying the core agent logic

* **Make conditional decisions**: Use accumulated state to determine whether to continue execution, jump to different nodes, or modify behavior dynamically

```typescript  theme={null}
import { createMiddleware, createAgent, HumanMessage } from "langchain";
import * as z from "zod";

const callCounterMiddleware = createMiddleware({
  name: "CallCounterMiddleware",
  stateSchema: z.object({
    modelCallCount: z.number().default(0),
    userId: z.string().optional(),
  }),
  beforeModel: (state) => {
    if (state.modelCallCount > 10) {
      return { jumpTo: "end" };
    }
    return;
  },
  afterModel: (state) => {
    return { modelCallCount: state.modelCallCount + 1 };
  },
});

const agent = createAgent({
  model: "gpt-4o",
  tools: [...],
  middleware: [callCounterMiddleware],
});

const result = await agent.invoke({
  messages: [new HumanMessage("Hello")],
  modelCallCount: 0,
  userId: "user-123",
});
```

State fields can be either public or private. Fields that start with an underscore (`_`) are considered private and will not be included in the agent's result. Only public fields (those without a leading underscore) are returned.

This is useful for storing internal middleware state that shouldn't be exposed to the caller, such as temporary tracking variables or internal flags:

```typescript  theme={null}
const middleware = createMiddleware({
  name: "ExampleMiddleware",
  stateSchema: z.object({
    // Public field - included in invoke result
    publicCounter: z.number().default(0),
    // Private field - excluded from invoke result
    _internalFlag: z.boolean().default(false),
  }),
  afterModel: (state) => {
    // Both fields are accessible during execution
    if (state._internalFlag) {
      return { publicCounter: state.publicCounter + 1 };
    }
    return { _internalFlag: true };
  },
});

const result = await agent.invoke({
  messages: [new HumanMessage("Hello")],
  publicCounter: 0
});

// result only contains publicCounter, not _internalFlag
console.log(result.publicCounter); // 1
console.log(result._internalFlag); // undefined
```

## Custom context

Middleware can define a custom context schema to access per-invocation metadata. Unlike state, context is read-only and not persisted between invocations. This makes it ideal for:

* **User information**: Pass user ID, roles, or preferences that don't change during execution
* **Configuration overrides**: Provide per-invocation settings like rate limits or feature flags
* **Tenant/workspace context**: Include organization-specific data for multi-tenant applications
* **Request metadata**: Pass request IDs, API keys, or other metadata needed by middleware

Define a context schema using Zod and access it via `runtime.context` in middleware hooks. Required fields in the context schema will be enforced at the TypeScript level, ensuring you must provide them when calling `agent.invoke()`.

```typescript  theme={null}
import { createAgent, createMiddleware, HumanMessage } from "langchain";
import * as z from "zod";

const contextSchema = z.object({
  userId: z.string(),
  tenantId: z.string(),
  apiKey: z.string().optional(),
});

const userContextMiddleware = createMiddleware({
  name: "UserContextMiddleware",
  contextSchema,
  wrapModelCall: (request, handler) => {
    // Access context from runtime
    const { userId, tenantId } = request.runtime.context;

    // Add user context to system message
    const contextText = `User ID: ${userId}, Tenant: ${tenantId}`;
    const newSystemMessage = request.systemMessage.concat(contextText);

    return handler({
      ...request,
      systemMessage: newSystemMessage,
    });
  },
});

const agent = createAgent({
  model: "gpt-4o",
  middleware: [userContextMiddleware],
  tools: [],
  contextSchema,
});

const result = await agent.invoke(
  { messages: [new HumanMessage("Hello")] },
  // Required fields (userId, tenantId) must be provided
  {
    context: {
      userId: "user-123",
      tenantId: "acme-corp",
    },
  }
);
```

**Required context fields**: When you define required fields in your `contextSchema` (fields without `.optional()` or `.default()`), TypeScript will enforce that these fields must be provided during `agent.invoke()` calls. This ensures type safety and prevents runtime errors from missing required context.

```typescript  theme={null}
// This will cause a TypeScript error if userId or tenantId are missing
const result = await agent.invoke(
  { messages: [new HumanMessage("Hello")] },
  { context: { userId: "user-123" } } // Error: tenantId is required
);
```

## Execution order

When using multiple middleware, understand how they execute:

```typescript  theme={null}
const agent = createAgent({
  model: "gpt-4o",
  middleware: [middleware1, middleware2, middleware3],
  tools: [...],
});
```

<Accordion title="Execution flow">
  **Before hooks run in order:**

  1. `middleware1.before_agent()`
  2. `middleware2.before_agent()`
  3. `middleware3.before_agent()`

  **Agent loop starts**

  4. `middleware1.before_model()`
  5. `middleware2.before_model()`
  6. `middleware3.before_model()`

  **Wrap hooks nest like function calls:**

  7. `middleware1.wrap_model_call()` → `middleware2.wrap_model_call()` → `middleware3.wrap_model_call()` → model

  **After hooks run in reverse order:**

  8. `middleware3.after_model()`
  9. `middleware2.after_model()`
  10. `middleware1.after_model()`

  **Agent loop ends**

  11. `middleware3.after_agent()`
  12. `middleware2.after_agent()`
  13. `middleware1.after_agent()`
</Accordion>

**Key rules:**

* `before_*` hooks: First to last
* `after_*` hooks: Last to first (reverse)
* `wrap_*` hooks: Nested (first middleware wraps all others)

## Agent jumps

To exit early from middleware, return a dictionary with `jump_to`:

**Available jump targets:**

* `'end'`: Jump to the end of the agent execution (or the first `after_agent` hook)
* `'tools'`: Jump to the tools node
* `'model'`: Jump to the model node (or the first `before_model` hook)

```typescript  theme={null}
import { createAgent, createMiddleware, AIMessage } from "langchain";

const agent = createAgent({
  model: "gpt-4o",
  middleware: [
    createMiddleware({
      name: "BlockedContentMiddleware",
      beforeModel: {
        canJumpTo: ["end"],
        hook: (state) => {
          if (state.messages.at(-1)?.content.includes("BLOCKED")) {
            return {
              messages: [new AIMessage("I cannot respond to that request.")],
              jumpTo: "end" as const,
            };
          }
          return;
        },
      },
    }),
  ],
});

const result = await agent.invoke({
    messages: "Hello, world! BLOCKED"
});

/**
 * Expected output:
 * I cannot respond to that request.
 */
console.log(result.messages.at(-1)?.content);
```

## Best practices

1. Keep middleware focused - each should do one thing well
2. Handle errors gracefully - don't let middleware errors crash the agent
3. **Use appropriate hook types**:
   * Node-style for sequential logic (logging, validation)
   * Wrap-style for control flow (retry, fallback, caching)
4. Clearly document any custom state properties
5. Unit test middleware independently before integrating
6. Consider execution order - place critical middleware first in the list
7. Use built-in middleware when possible

## Examples

### Dynamic model selection

```typescript  theme={null}
import { createMiddleware, initChatModel } from "langchain";

const dynamicModelMiddleware = createMiddleware({
  name: "DynamicModelMiddleware",
  wrapModelCall: (request, handler) => {
    const modifiedRequest = { ...request };
    if (request.messages.length > 10) {
      modifiedRequest.model = initChatModel("gpt-4o");
    } else {
      modifiedRequest.model = initChatModel("gpt-4o-mini");
    }
    return handler(modifiedRequest);
  },
});
```

### Tool call monitoring

```typescript  theme={null}
import { createMiddleware } from "langchain";

const toolMonitoringMiddleware = createMiddleware({
  name: "ToolMonitoringMiddleware",
  wrapToolCall: (request, handler) => {
    console.log(`Executing tool: ${request.toolCall.name}`);
    console.log(`Arguments: ${JSON.stringify(request.toolCall.args)}`);
    try {
      const result = handler(request);
      console.log("Tool completed successfully");
      return result;
    } catch (e) {
      console.log(`Tool failed: ${e}`);
      throw e;
    }
  },
});
```

### Dynamically selecting tools

Select relevant tools at runtime to improve performance and accuracy. This section covers filtering pre-registered tools. For registering tools that are discovered at runtime (e.g., from MCP servers), see [Runtime tool registration](/oss/javascript/langchain/agents#dynamic-tools).

**Benefits:**

* **Shorter prompts** - Reduce complexity by exposing only relevant tools
* **Better accuracy** - Models choose correctly from fewer options
* **Permission control** - Dynamically filter tools based on user access

```typescript  theme={null}
import { createAgent, createMiddleware } from "langchain";

const toolSelectorMiddleware = createMiddleware({
  name: "ToolSelector",
  wrapModelCall: (request, handler) => {
    // Select a small, relevant subset of tools based on state/context
    const relevantTools = selectRelevantTools(request.state, request.runtime);
    const modifiedRequest = { ...request, tools: relevantTools };
    return handler(modifiedRequest);
  },
});

const agent = createAgent({
  model: "gpt-4o",
  tools: allTools,
  middleware: [toolSelectorMiddleware],
});
```

### Working with system messages

Modify system messages in middleware using the `systemMessage` field in `ModelRequest`. It contains a [`SystemMessage`](https://reference.langchain.com/javascript/classes/_langchain_core.messages.SystemMessage.html) object (even if the agent was created with a string [`systemPrompt`](https://reference.langchain.com/javascript/types/langchain.index.CreateAgentParams.html#systemprompt)).

**Example: Chaining middleware** - Different middleware can use different approaches:

```typescript  theme={null}
import { createMiddleware, SystemMessage, createAgent } from "langchain";

// Middleware 1: Uses systemMessage with simple concatenation
const myMiddleware = createMiddleware({
  name: "MyMiddleware",
  wrapModelCall: async (request, handler) => {
    return handler({
      ...request,
      systemMessage: request.systemMessage.concat(`Additional context.`),
    });
  },
});

// Middleware 2: Uses systemMessage with structured content (preserves structure)
const myOtherMiddleware = createMiddleware({
  name: "MyOtherMiddleware",
  wrapModelCall: async (request, handler) => {
    return handler({
      ...request,
      systemMessage: request.systemMessage.concat(
        new SystemMessage({
          content: [
            {
              type: "text",
              text: " More additional context. This will be cached.",
              cache_control: { type: "ephemeral", ttl: "5m" },
            },
          ],
        })
      ),
    });
  },
});

const agent = createAgent({
  model: "anthropic:claude-3-5-sonnet",
  systemPrompt: "You are a helpful assistant.",
  middleware: [myMiddleware, myOtherMiddleware],
});
```

The resulting system message will be:

```typescript  theme={null}
new SystemMessage({
  content: [
    { type: "text", text: "You are a helpful assistant." },
    { type: "text", text: "Additional context." },
    {
        type: "text",
        text: " More additional context. This will be cached.",
        cache_control: { type: "ephemeral", ttl: "5m" },
    },
  ],
});
```

Use [`SystemMessage.concat`](https://reference.langchain.com/javascript/classes/_langchain_core.messages.SystemMessage.html#concat) to preserve cache control metadata or structured content blocks created by other middleware.

## Additional resources

* [Middleware API reference](https://reference.langchain.com/python/langchain/middleware/)
* [Built-in middleware](/oss/javascript/langchain/middleware/built-in)
* [Testing agents](/oss/javascript/langchain/test)

***

<Callout icon="pen-to-square" iconType="regular">
  [Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/oss/langchain/middleware/custom.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).
</Callout>

<Tip icon="terminal" iconType="regular">
  [Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.
</Tip>

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.langchain.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Guardrails

> Implement safety checks and content filtering for your agents

Guardrails help you build safe, compliant AI applications by validating and filtering content at key points in your agent's execution. They can detect sensitive information, enforce content policies, validate outputs, and prevent unsafe behaviors before they cause problems.

Common use cases include:

* Preventing PII leakage
* Detecting and blocking prompt injection attacks
* Blocking inappropriate or harmful content
* Enforcing business rules and compliance requirements
* Validating output quality and accuracy

You can implement guardrails using [middleware](/oss/javascript/langchain/middleware) to intercept execution at strategic points - before the agent starts, after it completes, or around model and tool calls.

<div style={{ display: "flex", justifyContent: "center" }}>
  <img src="https://mintcdn.com/langchain-5e9cc07a/RAP6mjwE5G00xYsA/oss/images/middleware_final.png?fit=max&auto=format&n=RAP6mjwE5G00xYsA&q=85&s=eb4404b137edec6f6f0c8ccb8323eaf1" alt="Middleware flow diagram" className="rounded-lg" data-og-width="500" width="500" data-og-height="560" height="560" data-path="oss/images/middleware_final.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/langchain-5e9cc07a/RAP6mjwE5G00xYsA/oss/images/middleware_final.png?w=280&fit=max&auto=format&n=RAP6mjwE5G00xYsA&q=85&s=483413aa87cf93323b0f47c0dd5528e8 280w, https://mintcdn.com/langchain-5e9cc07a/RAP6mjwE5G00xYsA/oss/images/middleware_final.png?w=560&fit=max&auto=format&n=RAP6mjwE5G00xYsA&q=85&s=41b7dd647447978ff776edafe5f42499 560w, https://mintcdn.com/langchain-5e9cc07a/RAP6mjwE5G00xYsA/oss/images/middleware_final.png?w=840&fit=max&auto=format&n=RAP6mjwE5G00xYsA&q=85&s=e9b14e264f68345de08ae76f032c52d4 840w, https://mintcdn.com/langchain-5e9cc07a/RAP6mjwE5G00xYsA/oss/images/middleware_final.png?w=1100&fit=max&auto=format&n=RAP6mjwE5G00xYsA&q=85&s=ec45e1932d1279b1beee4a4b016b473f 1100w, https://mintcdn.com/langchain-5e9cc07a/RAP6mjwE5G00xYsA/oss/images/middleware_final.png?w=1650&fit=max&auto=format&n=RAP6mjwE5G00xYsA&q=85&s=3bca5ebf8aa56632b8a9826f7f112e57 1650w, https://mintcdn.com/langchain-5e9cc07a/RAP6mjwE5G00xYsA/oss/images/middleware_final.png?w=2500&fit=max&auto=format&n=RAP6mjwE5G00xYsA&q=85&s=437f141d1266f08a95f030c2804691d9 2500w" />
</div>

Guardrails can be implemented using two complementary approaches:

<CardGroup cols={2}>
  <Card title="Deterministic guardrails" icon="list-check">
    Use rule-based logic like regex patterns, keyword matching, or explicit checks. Fast, predictable, and cost-effective, but may miss nuanced violations.
  </Card>

  <Card title="Model-based guardrails" icon="brain">
    Use LLMs or classifiers to evaluate content with semantic understanding. Catch subtle issues that rules miss, but are slower and more expensive.
  </Card>
</CardGroup>

LangChain provides both built-in guardrails (e.g., [PII detection](#pii-detection), [human-in-the-loop](#human-in-the-loop)) and a flexible middleware system for building custom guardrails using either approach.

## Built-in guardrails

### PII detection

LangChain provides built-in middleware for detecting and handling Personally Identifiable Information (PII) in conversations. This middleware can detect common PII types like emails, credit cards, IP addresses, and more.

PII detection middleware is helpful for cases such as health care and financial applications with compliance requirements, customer service agents that need to sanitize logs, and generally any application handling sensitive user data.

The PII middleware supports multiple strategies for handling detected PII:

| Strategy | Description                             | Example               |
| -------- | --------------------------------------- | --------------------- |
| `redact` | Replace with `[REDACTED_{PII_TYPE}]`    | `[REDACTED_EMAIL]`    |
| `mask`   | Partially obscure (e.g., last 4 digits) | `****-****-****-1234` |
| `hash`   | Replace with deterministic hash         | `a8f5f167...`         |
| `block`  | Raise exception when detected           | Error thrown          |

```typescript  theme={null}
import { createAgent, piiRedactionMiddleware } from "langchain";

const agent = createAgent({
  model: "gpt-4o",
  tools: [customerServiceTool, emailTool],
  middleware: [
    // Redact emails in user input before sending to model
    piiRedactionMiddleware({
      piiType: "email",
      strategy: "redact",
      applyToInput: true,
    }),
    // Mask credit cards in user input
    piiRedactionMiddleware({
      piiType: "credit_card",
      strategy: "mask",
      applyToInput: true,
    }),
    // Block API keys - raise error if detected
    piiRedactionMiddleware({
      piiType: "api_key",
      detector: /sk-[a-zA-Z0-9]{32}/,
      strategy: "block",
      applyToInput: true,
    }),
  ],
});

// When user provides PII, it will be handled according to the strategy
const result = await agent.invoke({
  messages: [{
    role: "user",
    content: "My email is john.doe@example.com and card is 5105-1051-0510-5100"
  }]
});
```

<Accordion title="Built-in PII types and configuration">
  **Built-in PII types:**

  * `email` - Email addresses
  * `credit_card` - Credit card numbers (Luhn validated)
  * `ip` - IP addresses
  * `mac_address` - MAC addresses
  * `url` - URLs

  **Configuration options:**

  | Parameter            | Description                                                            | Default                     |
  | -------------------- | ---------------------------------------------------------------------- | --------------------------- |
  | `piiType`            | Type of PII to detect (built-in or custom)                             | Required                    |
  | `strategy`           | How to handle detected PII (`"block"`, `"redact"`, `"mask"`, `"hash"`) | `"redact"`                  |
  | `detector`           | Custom detector regex pattern                                          | `undefined` (uses built-in) |
  | `applyToInput`       | Check user messages before model call                                  | `true`                      |
  | `applyToOutput`      | Check AI messages after model call                                     | `false`                     |
  | `applyToToolResults` | Check tool result messages after execution                             | `false`                     |
</Accordion>

See the [middleware documentation](/oss/javascript/langchain/middleware#pii-detection) for complete details on PII detection capabilities.

### Human-in-the-loop

LangChain provides built-in middleware for requiring human approval before executing sensitive operations. This is one of the most effective guardrails for high-stakes decisions.

Human-in-the-loop middleware is helpful for cases such as financial transactions and transfers, deleting or modifying production data, sending communications to external parties, and any operation with significant business impact.

```typescript  theme={null}
import { createAgent, humanInTheLoopMiddleware } from "langchain";
import { MemorySaver, Command } from "@langchain/langgraph";

const agent = createAgent({
  model: "gpt-4o",
  tools: [searchTool, sendEmailTool, deleteDatabaseTool],
  middleware: [
    humanInTheLoopMiddleware({
      interruptOn: {
        // Require approval for sensitive operations
        send_email: { allowAccept: true, allowEdit: true, allowRespond: true },
        delete_database: { allowAccept: true, allowEdit: true, allowRespond: true },
        // Auto-approve safe operations
        search: false,
      }
    }),
  ],
  checkpointer: new MemorySaver(),
});

// Human-in-the-loop requires a thread ID for persistence
const config = { configurable: { thread_id: "some_id" } };

// Agent will pause and wait for approval before executing sensitive tools
let result = await agent.invoke(
  { messages: [{ role: "user", content: "Send an email to the team" }] },
  config
);

result = await agent.invoke(
  new Command({ resume: { decisions: [{ type: "approve" }] } }),
  config  // Same thread ID to resume the paused conversation
);
```

<Tip>
  See the [human-in-the-loop documentation](/oss/javascript/langchain/human-in-the-loop) for complete details on implementing approval workflows.
</Tip>

## Custom guardrails

For more sophisticated guardrails, you can create custom middleware that runs before or after the agent executes. This gives you full control over validation logic, content filtering, and safety checks.

### Before agent guardrails

Use "before agent" hooks to validate requests once at the start of each invocation. This is useful for session-level checks like authentication, rate limiting, or blocking inappropriate requests before any processing begins.

```typescript  theme={null}
import { createMiddleware, AIMessage } from "langchain";

const contentFilterMiddleware = (bannedKeywords: string[]) => {
  const keywords = bannedKeywords.map(kw => kw.toLowerCase());

  return createMiddleware({
    name: "ContentFilterMiddleware",
    beforeAgent: {
      hook: (state) => {
        // Get the first user message
        if (!state.messages || state.messages.length === 0) {
          return;
        }

        const firstMessage = state.messages[0];
        if (firstMessage._getType() !== "human") {
          return;
        }

        const content = firstMessage.content.toString().toLowerCase();

        // Check for banned keywords
        for (const keyword of keywords) {
          if (content.includes(keyword)) {
            // Block execution before any processing
            return {
              messages: [
                new AIMessage(
                  "I cannot process requests containing inappropriate content. Please rephrase your request."
                )
              ],
              jumpTo: "end",
            };
          }
        }

        return;
      },
      canJumpTo: ['end']
    }
  });
};

// Use the custom guardrail
import { createAgent } from "langchain";

const agent = createAgent({
  model: "gpt-4o",
  tools: [searchTool, calculatorTool],
  middleware: [
    contentFilterMiddleware(["hack", "exploit", "malware"]),
  ],
});

// This request will be blocked before any processing
const result = await agent.invoke({
  messages: [{ role: "user", content: "How do I hack into a database?" }]
});
```

### After agent guardrails

Use "after agent" hooks to validate final outputs once before returning to the user. This is useful for model-based safety checks, quality validation, or final compliance scans on the complete agent response.

```typescript  theme={null}
import { createMiddleware, AIMessage, initChatModel } from "langchain";

const safetyGuardrailMiddleware = () => {
  const safetyModel = initChatModel("gpt-4o-mini");

  return createMiddleware({
    name: "SafetyGuardrailMiddleware",
    afterAgent: {
      hook: async (state) => {
        // Get the final AI response
        if (!state.messages || state.messages.length === 0) {
          return;
        }

        const lastMessage = state.messages[state.messages.length - 1];
        if (lastMessage._getType() !== "ai") {
          return;
        }

        // Use a model to evaluate safety
        const safetyPrompt = `Evaluate if this response is safe and appropriate.
        Respond with only 'SAFE' or 'UNSAFE'.

        Response: ${lastMessage.content.toString()}`;

        const result = await safetyModel.invoke([
          { role: "user", content: safetyPrompt }
        ]);

        if (result.content.toString().includes("UNSAFE")) {
          return {
            messages: [
              new AIMessage(
                "I cannot provide that response. Please rephrase your request."
              )
            ],
            jumpTo: "end",
          };
        }

        return;
      },
      canJumpTo: ['end']
    }
  });
};

// Use the safety guardrail
import { createAgent } from "langchain";

const agent = createAgent({
  model: "gpt-4o",
  tools: [searchTool, calculatorTool],
  middleware: [safetyGuardrailMiddleware()],
});

const result = await agent.invoke({
  messages: [{ role: "user", content: "How do I make explosives?" }]
});
```

### Combine multiple guardrails

You can stack multiple guardrails by adding them to the middleware array. They execute in order, allowing you to build layered protection:

```typescript  theme={null}
import { createAgent, piiRedactionMiddleware, humanInTheLoopMiddleware } from "langchain";

const agent = createAgent({
  model: "gpt-4o",
  tools: [searchTool, sendEmailTool],
  middleware: [
    // Layer 1: Deterministic input filter (before agent)
    contentFilterMiddleware(["hack", "exploit"]),

    // Layer 2: PII protection (before and after model)
    piiRedactionMiddleware({
      piiType: "email",
      strategy: "redact",
      applyToInput: true,
    }),
    piiRedactionMiddleware({
      piiType: "email",
      strategy: "redact",
      applyToOutput: true,
    }),

    // Layer 3: Human approval for sensitive tools
    humanInTheLoopMiddleware({
      interruptOn: {
        send_email: { allowAccept: true, allowEdit: true, allowRespond: true },
      }
    }),

    // Layer 4: Model-based safety check (after agent)
    safetyGuardrailMiddleware(),
  ],
});
```

## Additional resources

* [Middleware documentation](/oss/javascript/langchain/middleware) - Complete guide to custom middleware
* [Middleware API reference](https://reference.langchain.com/python/langchain/middleware/) - Complete guide to custom middleware
* [Human-in-the-loop](/oss/javascript/langchain/human-in-the-loop) - Add human review for sensitive operations
* [Testing agents](/oss/javascript/langchain/test) - Strategies for testing safety mechanisms

***

<Callout icon="pen-to-square" iconType="regular">
  [Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/oss/langchain/guardrails.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).
</Callout>

<Tip icon="terminal" iconType="regular">
  [Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.
</Tip>

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.langchain.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Runtime

## Overview

LangChain's `createAgent` runs on LangGraph's runtime under the hood.

LangGraph exposes a [`Runtime`](https://reference.langchain.com/javascript/interfaces/_langchain_langgraph.index.Runtime.html) object with the following information:

1. **Context**: static information like user id, db connections, or other dependencies for an agent invocation
2. **Store**: a [BaseStore](https://reference.langchain.com/javascript/classes/_langchain_langgraph-checkpoint.BaseStore.html) instance used for [long-term memory](/oss/javascript/langchain/long-term-memory)
3. **Stream writer**: an object used for streaming information via the `"custom"` stream mode

<Tip>
  The runtime context is how you thread data through your agent. Rather than storing things in global state, you can attach values — like a database connection, user session, or configuration — to the context and access them inside tools and middleware. This keeps things stateless, testable, and reusable.
</Tip>

You can access the runtime information within [tools](#inside-tools) and [middleware](#inside-middleware).

## Access

When creating an agent with `createAgent`, you can specify a `contextSchema` to define the structure of the `context` stored in the agent [`Runtime`](https://reference.langchain.com/javascript/interfaces/_langchain_langgraph.index.Runtime.html).

When invoking the agent, pass the `context` argument with the relevant configuration for the run:

```ts  theme={null}
import * as z from "zod";
import { createAgent } from "langchain";

const contextSchema = z.object({ // [!code highlight]
  userName: z.string(), // [!code highlight]
}); // [!code highlight]

const agent = createAgent({
  model: "gpt-4o",
  tools: [
    /* ... */
  ],
  contextSchema, // [!code highlight]
});

const result = await agent.invoke(
  { messages: [{ role: "user", content: "What's my name?" }] },
  { context: { userName: "John Smith" } } // [!code highlight]
);
```

### Inside tools

You can access the runtime information inside tools to:

* Access the context
* Read or write long-term memory
* Write to the [custom stream](/oss/javascript/langchain/streaming#custom-updates) (ex, tool progress / updates)

Use the `runtime` parameter to access the [`Runtime`](https://reference.langchain.com/javascript/interfaces/_langchain_langgraph.index.Runtime.html) object inside a tool.

```ts  theme={null}
import * as z from "zod";
import { tool } from "langchain";
import { type ToolRuntime } from "@langchain/core/tools"; // [!code highlight]

const contextSchema = z.object({
  userName: z.string(),
});

const fetchUserEmailPreferences = tool(
  async (_, runtime: ToolRuntime<any, typeof contextSchema>) => { // [!code highlight]
    const userName = runtime.context?.userName; // [!code highlight]
    if (!userName) {
      throw new Error("userName is required");
    }

    let preferences = "The user prefers you to write a brief and polite email.";
    if (runtime.store) { // [!code highlight]
      const memory = await runtime.store?.get(["users"], userName); // [!code highlight]
      if (memory) {
        preferences = memory.value.preferences;
      }
    }
    return preferences;
  },
  {
    name: "fetch_user_email_preferences",
    description: "Fetch the user's email preferences.",
    schema: z.object({}),
  }
);
```

### Inside middleware

You can access runtime information in middleware to create dynamic prompts, modify messages, or control agent behavior based on user context.

Use the `runtime` parameter to access the [`Runtime`](https://reference.langchain.com/javascript/interfaces/_langchain_langgraph.index.Runtime.html) object inside middleware.

```ts  theme={null}
import * as z from "zod";
import { createAgent, createMiddleware, SystemMessage } from "langchain";

const contextSchema = z.object({
  userName: z.string(),
});

// Dynamic prompt middleware
const dynamicPromptMiddleware = createMiddleware({
  name: "DynamicPrompt",
  contextSchema,
  beforeModel: (state, runtime) => { // [!code highlight]
    const userName = runtime.context?.userName; // [!code highlight]
    if (!userName) {
      throw new Error("userName is required");
    }

    const systemMsg = `You are a helpful assistant. Address the user as ${userName}.`;
    return {
      messages: [new SystemMessage(systemMsg), ...state.messages],
    };
  },
});

// Logging middleware
const loggingMiddleware = createMiddleware({
  name: "Logging",
  contextSchema,
  beforeModel: (state, runtime) => {  // [!code highlight]
    console.log(`Processing request for user: ${runtime.context?.userName}`);  // [!code highlight]
    return;
  },
  afterModel: (state, runtime) => {  // [!code highlight]
    console.log(`Completed request for user: ${runtime.context?.userName}`);  // [!code highlight]
    return;
  },
});

const agent = createAgent({
  model: "gpt-4o",
  tools: [
    /* ... */
  ],
  middleware: [dynamicPromptMiddleware, loggingMiddleware],  // [!code highlight]
  contextSchema,
});

const result = await agent.invoke(
  { messages: [{ role: "user", content: "What's my name?" }] },
  { context: { userName: "John Smith" } }
);

```

***

<Callout icon="pen-to-square" iconType="regular">
  [Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/oss/langchain/runtime.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).
</Callout>

<Tip icon="terminal" iconType="regular">
  [Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.
</Tip>

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.langchain.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Context engineering in agents

## Overview

The hard part of building agents (or any LLM application) is making them reliable enough. While they may work for a prototype, they often fail in real-world use cases.

### Why do agents fail?

When agents fail, it's usually because the LLM call inside the agent took the wrong action / didn't do what we expected. LLMs fail for one of two reasons:

1. The underlying LLM is not capable enough
2. The "right" context was not passed to the LLM

More often than not - it's actually the second reason that causes agents to not be reliable.

**Context engineering** is providing the right information and tools in the right format so the LLM can accomplish a task. This is the number one job of AI Engineers. This lack of "right" context is the number one blocker for more reliable agents, and LangChain's agent abstractions are uniquely designed to facilitate context engineering.

<Tip>
  New to context engineering? Start with the [conceptual overview](/oss/javascript/concepts/context) to understand the different types of context and when to use them.
</Tip>

### The agent loop

A typical agent loop consists of two main steps:

1. **Model call** - calls the LLM with a prompt and available tools, returns either a response or a request to execute tools
2. **Tool execution** - executes the tools that the LLM requested, returns tool results

<div style={{ display: "flex", justifyContent: "center" }}>
  <img src="https://mintcdn.com/langchain-5e9cc07a/Tazq8zGc0yYUYrDl/oss/images/core_agent_loop.png?fit=max&auto=format&n=Tazq8zGc0yYUYrDl&q=85&s=ac72e48317a9ced68fd1be64e89ec063" alt="Core agent loop diagram" className="rounded-lg" data-og-width="300" width="300" data-og-height="268" height="268" data-path="oss/images/core_agent_loop.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/langchain-5e9cc07a/Tazq8zGc0yYUYrDl/oss/images/core_agent_loop.png?w=280&fit=max&auto=format&n=Tazq8zGc0yYUYrDl&q=85&s=a4c4b766b6678ef52a6ed556b1a0b032 280w, https://mintcdn.com/langchain-5e9cc07a/Tazq8zGc0yYUYrDl/oss/images/core_agent_loop.png?w=560&fit=max&auto=format&n=Tazq8zGc0yYUYrDl&q=85&s=111869e6e99a52c0eff60a1ef7ddc49c 560w, https://mintcdn.com/langchain-5e9cc07a/Tazq8zGc0yYUYrDl/oss/images/core_agent_loop.png?w=840&fit=max&auto=format&n=Tazq8zGc0yYUYrDl&q=85&s=6c1e21de7b53bd0a29683aca09c6f86e 840w, https://mintcdn.com/langchain-5e9cc07a/Tazq8zGc0yYUYrDl/oss/images/core_agent_loop.png?w=1100&fit=max&auto=format&n=Tazq8zGc0yYUYrDl&q=85&s=88bef556edba9869b759551c610c60f4 1100w, https://mintcdn.com/langchain-5e9cc07a/Tazq8zGc0yYUYrDl/oss/images/core_agent_loop.png?w=1650&fit=max&auto=format&n=Tazq8zGc0yYUYrDl&q=85&s=9b0bdd138e9548eeb5056dc0ed2d4a4b 1650w, https://mintcdn.com/langchain-5e9cc07a/Tazq8zGc0yYUYrDl/oss/images/core_agent_loop.png?w=2500&fit=max&auto=format&n=Tazq8zGc0yYUYrDl&q=85&s=41eb4f053ed5e6b0ba5bad2badf6d755 2500w" />
</div>

This loop continues until the LLM decides to finish.

### What you can control

To build reliable agents, you need to control what happens at each step of the agent loop, as well as what happens between steps.

| Context Type                                  | What You Control                                                                     | Transient or Persistent |
| --------------------------------------------- | ------------------------------------------------------------------------------------ | ----------------------- |
| **[Model Context](#model-context)**           | What goes into model calls (instructions, message history, tools, response format)   | Transient               |
| **[Tool Context](#tool-context)**             | What tools can access and produce (reads/writes to state, store, runtime context)    | Persistent              |
| **[Life-cycle Context](#life-cycle-context)** | What happens between model and tool calls (summarization, guardrails, logging, etc.) | Persistent              |

<CardGroup>
  <Card title="Transient context" icon="bolt" iconType="duotone">
    What the LLM sees for a single call. You can modify messages, tools, or prompts without changing what's saved in state.
  </Card>

  <Card title="Persistent context" icon="database" iconType="duotone">
    What gets saved in state across turns. Life-cycle hooks and tool writes modify this permanently.
  </Card>
</CardGroup>

### Data sources

Throughout this process, your agent accesses (reads / writes) different sources of data:

| Data Source         | Also Known As        | Scope               | Examples                                                                   |
| ------------------- | -------------------- | ------------------- | -------------------------------------------------------------------------- |
| **Runtime Context** | Static configuration | Conversation-scoped | User ID, API keys, database connections, permissions, environment settings |
| **State**           | Short-term memory    | Conversation-scoped | Current messages, uploaded files, authentication status, tool results      |
| **Store**           | Long-term memory     | Cross-conversation  | User preferences, extracted insights, memories, historical data            |

### How it works

LangChain [middleware](/oss/javascript/langchain/middleware) is the mechanism under the hood that makes context engineering practical for developers using LangChain.

Middleware allows you to hook into any step in the agent lifecycle and:

* Update context
* Jump to a different step in the agent lifecycle

Throughout this guide, you'll see frequent use of the middleware API as a means to the context engineering end.

## Model context

Control what goes into each model call - instructions, available tools, which model to use, and output format. These decisions directly impact reliability and cost.

<CardGroup cols={2}>
  <Card title="System Prompt" icon="message-lines" href="#system-prompt">
    Base instructions from the developer to the LLM.
  </Card>

  <Card title="Messages" icon="comments" href="#messages">
    The full list of messages (conversation history) sent to the LLM.
  </Card>

  <Card title="Tools" icon="wrench" href="#tools">
    Utilities the agent has access to to take actions.
  </Card>

  <Card title="Model" icon="brain-circuit" href="#model">
    The actual model (including configuration) to be called.
  </Card>

  <Card title="Response Format" icon="brackets-curly" href="#response-format">
    Schema specification for the model's final response.
  </Card>
</CardGroup>

All of these types of model context can draw from **state** (short-term memory), **store** (long-term memory), or **runtime context** (static configuration).

### System Prompt

The system prompt sets the LLM's behavior and capabilities. Different users, contexts, or conversation stages need different instructions. Successful agents draw on memories, preferences, and configuration to provide the right instructions for the current state of the conversation.

<Tabs>
  <Tab title="State">
    Access message count or conversation context from state:

    ```typescript  theme={null}
    import { createAgent } from "langchain";

    const agent = createAgent({
      model: "gpt-4o",
      tools: [...],
      middleware: [
        dynamicSystemPromptMiddleware((state) => {
          // Read from State: check conversation length
          const messageCount = state.messages.length;

          let base = "You are a helpful assistant.";

          if (messageCount > 10) {
            base += "\nThis is a long conversation - be extra concise.";
          }

          return base;
        }),
      ],
    });
    ```
  </Tab>

  <Tab title="Store">
    Access user preferences from long-term memory:

    ```typescript  theme={null}
    import * as z from "zod";
    import { createAgent, dynamicSystemPromptMiddleware } from "langchain";

    const contextSchema = z.object({
      userId: z.string(),
    });

    type Context = z.infer<typeof contextSchema>;

    const agent = createAgent({
      model: "gpt-4o",
      tools: [...],
      contextSchema,
      middleware: [
        dynamicSystemPromptMiddleware<Context>(async (state, runtime) => {
          const userId = runtime.context.userId;

          // Read from Store: get user preferences
          const store = runtime.store;
          const userPrefs = await store.get(["preferences"], userId);

          let base = "You are a helpful assistant.";

          if (userPrefs) {
            const style = userPrefs.value?.communicationStyle || "balanced";
            base += `\nUser prefers ${style} responses.`;
          }

          return base;
        }),
      ],
    });
    ```
  </Tab>

  <Tab title="Runtime Context">
    Access user ID or configuration from Runtime Context:

    ```typescript  theme={null}
    import * as z from "zod";
    import { createAgent, dynamicSystemPromptMiddleware } from "langchain";

    const contextSchema = z.object({
      userRole: z.string(),
      deploymentEnv: z.string(),
    });

    type Context = z.infer<typeof contextSchema>;

    const agent = createAgent({
      model: "gpt-4o",
      tools: [...],
      contextSchema,
      middleware: [
        dynamicSystemPromptMiddleware<Context>((state, runtime) => {
          // Read from Runtime Context: user role and environment
          const userRole = runtime.context.userRole;
          const env = runtime.context.deploymentEnv;

          let base = "You are a helpful assistant.";

          if (userRole === "admin") {
            base += "\nYou have admin access. You can perform all operations.";
          } else if (userRole === "viewer") {
            base += "\nYou have read-only access. Guide users to read operations only.";
          }

          if (env === "production") {
            base += "\nBe extra careful with any data modifications.";
          }

          return base;
        }),
      ],
    });
    ```
  </Tab>
</Tabs>

### Messages

Messages make up the prompt that is sent to the LLM.
It's critical to manage the content of messages to ensure that the LLM has the right information to respond well.

<Tabs>
  <Tab title="State">
    Inject uploaded file context from State when relevant to current query:

    ```typescript  theme={null}
    import { createMiddleware } from "langchain";

    const injectFileContext = createMiddleware({
      name: "InjectFileContext",
      wrapModelCall: (request, handler) => {
        // request.state is a shortcut for request.state.messages
        const uploadedFiles = request.state.uploadedFiles || [];  // [!code highlight]

        if (uploadedFiles.length > 0) {
          // Build context about available files
          const fileDescriptions = uploadedFiles.map(file =>
            `- ${file.name} (${file.type}): ${file.summary}`
          );

          const fileContext = `Files you have access to in this conversation:
    ${fileDescriptions.join("\n")}

    Reference these files when answering questions.`;

          // Inject file context before recent messages
          const messages = [  // [!code highlight]
            ...request.messages,  // Rest of conversation
            { role: "user", content: fileContext }
          ];
          request = request.override({ messages });  // [!code highlight]
        }

        return handler(request);
      },
    });

    const agent = createAgent({
      model: "gpt-4o",
      tools: [...],
      middleware: [injectFileContext],
    });
    ```
  </Tab>

  <Tab title="Store">
    Inject user's email writing style from Store to guide drafting:

    ```typescript  theme={null}
    import * as z from "zod";
    import { createMiddleware } from "langchain";

    const contextSchema = z.object({
      userId: z.string(),
    });

    const injectWritingStyle = createMiddleware({
      name: "InjectWritingStyle",
      contextSchema,
      wrapModelCall: async (request, handler) => {
        const userId = request.runtime.context.userId;  // [!code highlight]

        // Read from Store: get user's writing style examples
        const store = request.runtime.store;  // [!code highlight]
        const writingStyle = await store.get(["writing_style"], userId);  // [!code highlight]

        if (writingStyle) {
          const style = writingStyle.value;
          // Build style guide from stored examples
          const styleContext = `Your writing style:
    - Tone: ${style.tone || 'professional'}
    - Typical greeting: "${style.greeting || 'Hi'}"
    - Typical sign-off: "${style.signOff || 'Best'}"
    - Example email you've written:
    ${style.exampleEmail || ''}`;

          // Append at end - models pay more attention to final messages
          const messages = [
            ...request.messages,
            { role: "user", content: styleContext }
          ];
          request = request.override({ messages });  // [!code highlight]
        }

        return handler(request);
      },
    });
    ```
  </Tab>

  <Tab title="Runtime Context">
    Inject compliance rules from Runtime Context based on user's jurisdiction:

    ```typescript  theme={null}
    import * as z from "zod";
    import { createMiddleware } from "langchain";

    const contextSchema = z.object({
      userJurisdiction: z.string(),
      industry: z.string(),
      complianceFrameworks: z.array(z.string()),
    });

    type Context = z.infer<typeof contextSchema>;

    const injectComplianceRules = createMiddleware<Context>({
      name: "InjectComplianceRules",
      contextSchema,
      wrapModelCall: (request, handler) => {
        // Read from Runtime Context: get compliance requirements
        const { userJurisdiction, industry, complianceFrameworks } = request.runtime.context;  // [!code highlight]

        // Build compliance constraints
        const rules = [];
        if (complianceFrameworks.includes("GDPR")) {
          rules.push("- Must obtain explicit consent before processing personal data");
          rules.push("- Users have right to data deletion");
        }
        if (complianceFrameworks.includes("HIPAA")) {
          rules.push("- Cannot share patient health information without authorization");
          rules.push("- Must use secure, encrypted communication");
        }
        if (industry === "finance") {
          rules.push("- Cannot provide financial advice without proper disclaimers");
        }

        if (rules.length > 0) {
          const complianceContext = `Compliance requirements for ${userJurisdiction}:
    ${rules.join("\n")}`;

          // Append at end - models pay more attention to final messages
          const messages = [
            ...request.messages,
            { role: "user", content: complianceContext }
          ];
          request = request.override({ messages });  // [!code highlight]
        }

        return handler(request);
      },
    });
    ```
  </Tab>
</Tabs>

<Note>
  **Transient vs Persistent Message Updates:**

  The examples above use `wrap_model_call` to make **transient** updates - modifying what messages are sent to the model for a single call without changing what's saved in state.

  For **persistent** updates that modify state (like the summarization example in [Life-cycle Context](#summarization)), use life-cycle hooks like `before_model` or `after_model` to permanently update the conversation history. See the [middleware documentation](/oss/javascript/langchain/middleware) for more details.
</Note>

### Tools

Tools let the model interact with databases, APIs, and external systems. How you define and select tools directly impacts whether the model can complete tasks effectively.

#### Defining tools

Each tool needs a clear name, description, argument names, and argument descriptions. These aren't just metadata—they guide the model's reasoning about when and how to use the tool.

```typescript  theme={null}
import { tool } from "@langchain/core/tools";
import { z } from "zod";

const searchOrders = tool(
  async ({ userId, status, limit }) => {
    // Implementation here
  },
  {
    name: "search_orders",
    description: `Search for user orders by status.

    Use this when the user asks about order history or wants to check
    order status. Always filter by the provided status.`,
    schema: z.object({
      userId: z.string().describe("Unique identifier for the user"),
      status: z.enum(["pending", "shipped", "delivered"]).describe("Order status to filter by"),
      limit: z.number().default(10).describe("Maximum number of results to return"),
    }),
  }
);
```

#### Selecting tools

Not every tool is appropriate for every situation. Too many tools may overwhelm the model (overload context) and increase errors; too few limit capabilities. Dynamic tool selection adapts the available toolset based on authentication state, user permissions, feature flags, or conversation stage.

<Tabs>
  <Tab title="State">
    Enable advanced tools only after certain conversation milestones:

    ```typescript  theme={null}
    import { createMiddleware } from "langchain";

    const stateBasedTools = createMiddleware({
      name: "StateBasedTools",
      wrapModelCall: (request, handler) => {
        // Read from State: check authentication and conversation length
        const state = request.state;  // [!code highlight]
        const isAuthenticated = state.authenticated || false;  // [!code highlight]
        const messageCount = state.messages.length;

        let filteredTools = request.tools;

        // Only enable sensitive tools after authentication
        if (!isAuthenticated) {
          filteredTools = request.tools.filter(t => t.name.startsWith("public_"));  // [!code highlight]
        } else if (messageCount < 5) {
          filteredTools = request.tools.filter(t => t.name !== "advanced_search");  // [!code highlight]
        }

        return handler({ ...request, tools: filteredTools });  // [!code highlight]
      },
    });
    ```
  </Tab>

  <Tab title="Store">
    Filter tools based on user preferences or feature flags in Store:

    ```typescript  theme={null}
    import * as z from "zod";
    import { createMiddleware } from "langchain";

    const contextSchema = z.object({
      userId: z.string(),
    });

    const storeBasedTools = createMiddleware({
      name: "StoreBasedTools",
      contextSchema,
      wrapModelCall: async (request, handler) => {
        const userId = request.runtime.context.userId;  // [!code highlight]

        // Read from Store: get user's enabled features
        const store = request.runtime.store;  // [!code highlight]
        const featureFlags = await store.get(["features"], userId);  // [!code highlight]

        let filteredTools = request.tools;

        if (featureFlags) {
          const enabledFeatures = featureFlags.value?.enabledTools || [];
          filteredTools = request.tools.filter(t => enabledFeatures.includes(t.name));  // [!code highlight]
        }

        return handler({ ...request, tools: filteredTools });  // [!code highlight]
      },
    });
    ```
  </Tab>

  <Tab title="Runtime Context">
    Filter tools based on user permissions from Runtime Context:

    ```typescript  theme={null}
    import * as z from "zod";
    import { createMiddleware } from "langchain";

    const contextSchema = z.object({
      userRole: z.string(),
    });

    const contextBasedTools = createMiddleware({
      name: "ContextBasedTools",
      contextSchema,
      wrapModelCall: (request, handler) => {
        // Read from Runtime Context: get user role
        const userRole = request.runtime.context.userRole;  // [!code highlight]

        let filteredTools = request.tools;

        if (userRole === "admin") {
          // Admins get all tools
        } else if (userRole === "editor") {
          filteredTools = request.tools.filter(t => t.name !== "delete_data");  // [!code highlight]
        } else {
          filteredTools = request.tools.filter(t => t.name.startsWith("read_"));  // [!code highlight]
        }

        return handler({ ...request, tools: filteredTools });  // [!code highlight]
      },
    });
    ```
  </Tab>
</Tabs>

See [Dynamic tools](/oss/javascript/langchain/agents#dynamic-tools) for both filtering pre-registered tools and registering tools at runtime (e.g., from MCP servers).

### Model

Different models have different strengths, costs, and context windows. Select the right model for the task at hand, which
might change during an agent run.

<Tabs>
  <Tab title="State">
    Use different models based on conversation length from State:

    ```typescript  theme={null}
    import { createMiddleware, initChatModel } from "langchain";

    // Initialize models once outside the middleware
    const largeModel = initChatModel("claude-sonnet-4-5-20250929");
    const standardModel = initChatModel("gpt-4o");
    const efficientModel = initChatModel("gpt-4o-mini");

    const stateBasedModel = createMiddleware({
      name: "StateBasedModel",
      wrapModelCall: (request, handler) => {
        // request.messages is a shortcut for request.state.messages
        const messageCount = request.messages.length;  // [!code highlight]
        let model;

        if (messageCount > 20) {
          model = largeModel;
        } else if (messageCount > 10) {
          model = standardModel;
        } else {
          model = efficientModel;
        }

        return handler({ ...request, model });  // [!code highlight]
      },
    });
    ```
  </Tab>

  <Tab title="Store">
    Use user's preferred model from Store:

    ```typescript  theme={null}
    import * as z from "zod";
    import { createMiddleware, initChatModel } from "langchain";

    const contextSchema = z.object({
      userId: z.string(),
    });

    // Initialize available models once
    const MODEL_MAP = {
      "gpt-4o": initChatModel("gpt-4o"),
      "gpt-4o-mini": initChatModel("gpt-4o-mini"),
      "claude-sonnet": initChatModel("claude-sonnet-4-5-20250929"),
    };

    const storeBasedModel = createMiddleware({
      name: "StoreBasedModel",
      contextSchema,
      wrapModelCall: async (request, handler) => {
        const userId = request.runtime.context.userId;  // [!code highlight]

        // Read from Store: get user's preferred model
        const store = request.runtime.store;  // [!code highlight]
        const userPrefs = await store.get(["preferences"], userId);  // [!code highlight]

        let model = request.model;

        if (userPrefs) {
          const preferredModel = userPrefs.value?.preferredModel;
          if (preferredModel && MODEL_MAP[preferredModel]) {
            model = MODEL_MAP[preferredModel];  // [!code highlight]
          }
        }

        return handler({ ...request, model });  // [!code highlight]
      },
    });
    ```
  </Tab>

  <Tab title="Runtime Context">
    Select model based on cost limits or environment from Runtime Context:

    ```typescript  theme={null}
    import * as z from "zod";
    import { createMiddleware, initChatModel } from "langchain";

    const contextSchema = z.object({
      costTier: z.string(),
      environment: z.string(),
    });

    // Initialize models once outside the middleware
    const premiumModel = initChatModel("claude-sonnet-4-5-20250929");
    const standardModel = initChatModel("gpt-4o");
    const budgetModel = initChatModel("gpt-4o-mini");

    const contextBasedModel = createMiddleware({
      name: "ContextBasedModel",
      contextSchema,
      wrapModelCall: (request, handler) => {
        // Read from Runtime Context: cost tier and environment
        const costTier = request.runtime.context.costTier;  // [!code highlight]
        const environment = request.runtime.context.environment;  // [!code highlight]

        let model;

        if (environment === "production" && costTier === "premium") {
          model = premiumModel;
        } else if (costTier === "budget") {
          model = budgetModel;
        } else {
          model = standardModel;
        }

        return handler({ ...request, model });  // [!code highlight]
      },
    });
    ```
  </Tab>
</Tabs>

See [Dynamic model](/oss/javascript/langchain/agents#dynamic-model) for more examples.

### Response format

Structured output transforms unstructured text into validated, structured data. When extracting specific fields or returning data for downstream systems, free-form text isn't sufficient.

**How it works:** When you provide a schema as the response format, the model's final response is guaranteed to conform to that schema. The agent runs the model / tool calling loop until the model is done calling tools, then the final response is coerced into the provided format.

#### Defining formats

Schema definitions guide the model. Field names, types, and descriptions specify exactly what format the output should adhere to.

```typescript  theme={null}
import { z } from "zod";

const customerSupportTicket = z.object({
  category: z.enum(["billing", "technical", "account", "product"]).describe(
    "Issue category"
  ),
  priority: z.enum(["low", "medium", "high", "critical"]).describe(
    "Urgency level"
  ),
  summary: z.string().describe(
    "One-sentence summary of the customer's issue"
  ),
  customerSentiment: z.enum(["frustrated", "neutral", "satisfied"]).describe(
    "Customer's emotional tone"
  ),
}).describe("Structured ticket information extracted from customer message");
```

#### Selecting formats

Dynamic response format selection adapts schemas based on user preferences, conversation stage, or role—returning simple formats early and detailed formats as complexity increases.

<Tabs>
  <Tab title="State">
    Configure structured output based on conversation state:

    ```typescript  theme={null}
    import { createMiddleware } from "langchain";
    import { z } from "zod";

    const simpleResponse = z.object({
      answer: z.string().describe("A brief answer"),
    });

    const detailedResponse = z.object({
      answer: z.string().describe("A detailed answer"),
      reasoning: z.string().describe("Explanation of reasoning"),
      confidence: z.number().describe("Confidence score 0-1"),
    });

    const stateBasedOutput = createMiddleware({
      name: "StateBasedOutput",
      wrapModelCall: (request, handler) => {
        // request.state is a shortcut for request.state.messages
        const messageCount = request.messages.length;  // [!code highlight]

        let responseFormat;
        if (messageCount < 3) {
          // Early conversation - use simple format
          responseFormat = simpleResponse; // [!code highlight]
        } else {
          // Established conversation - use detailed format
          responseFormat = detailedResponse; // [!code highlight]
        }

        return handler({ ...request, responseFormat });
      },
    });
    ```
  </Tab>

  <Tab title="Store">
    Configure output format based on user preferences in Store:

    ```typescript  theme={null}
    import * as z from "zod";
    import { createMiddleware } from "langchain";

    const contextSchema = z.object({
      userId: z.string(),
    });

    const verboseResponse = z.object({
      answer: z.string().describe("Detailed answer"),
      sources: z.array(z.string()).describe("Sources used"),
    });

    const conciseResponse = z.object({
      answer: z.string().describe("Brief answer"),
    });

    const storeBasedOutput = createMiddleware({
      name: "StoreBasedOutput",
      wrapModelCall: async (request, handler) => {
        const userId = request.runtime.context.userId;  // [!code highlight]

        // Read from Store: get user's preferred response style
        const store = request.runtime.store;  // [!code highlight]
        const userPrefs = await store.get(["preferences"], userId);  // [!code highlight]

        if (userPrefs) {
          const style = userPrefs.value?.responseStyle || "concise";
          if (style === "verbose") {
            request.responseFormat = verboseResponse;  // [!code highlight]
          } else {
            request.responseFormat = conciseResponse;  // [!code highlight]
          }
        }

        return handler(request);
      },
    });
    ```
  </Tab>

  <Tab title="Runtime Context">
    Configure output format based on Runtime Context like user role or environment:

    ```typescript  theme={null}
    import * as z from "zod";
    import { createMiddleware } from "langchain";

    const contextSchema = z.object({
      userRole: z.string(),
      environment: z.string(),
    });

    const adminResponse = z.object({
      answer: z.string().describe("Answer"),
      debugInfo: z.record(z.any()).describe("Debug information"),
      systemStatus: z.string().describe("System status"),
    });

    const userResponse = z.object({
      answer: z.string().describe("Answer"),
    });

    const contextBasedOutput = createMiddleware({
      name: "ContextBasedOutput",
      wrapModelCall: (request, handler) => {
        // Read from Runtime Context: user role and environment
        const userRole = request.runtime.context.userRole;  // [!code highlight]
        const environment = request.runtime.context.environment;  // [!code highlight]

        let responseFormat;
        if (userRole === "admin" && environment === "production") {
          responseFormat = adminResponse;  // [!code highlight]
        } else {
          responseFormat = userResponse;  // [!code highlight]
        }

        return handler({ ...request, responseFormat });
      },
    });
    ```
  </Tab>
</Tabs>

## Tool context

Tools are special in that they both read and write context.

In the most basic case, when a tool executes, it receives the LLM's request parameters and returns a tool message back. The tool does its work and produces a result.

Tools can also fetch important information for the model that allows it to perform and complete tasks.

### Reads

Most real-world tools need more than just the LLM's parameters. They need user IDs for database queries, API keys for external services, or current session state to make decisions. Tools read from state, store, and runtime context to access this information.

<Tabs>
  <Tab title="State">
    Read from State to check current session information:

    ```typescript  theme={null}
    import * as z from "zod";
    import { createAgent, tool, type ToolRuntime } from "langchain";

    const checkAuthentication = tool(
      async (_, runtime: ToolRuntime) => {
        // Read from State: check current auth status
        const currentState = runtime.state;
        const isAuthenticated = currentState.authenticated || false;

        if (isAuthenticated) {
          return "User is authenticated";
        } else {
          return "User is not authenticated";
        }
      },
      {
        name: "check_authentication",
        description: "Check if user is authenticated",
        schema: z.object({}),
      }
    );
    ```
  </Tab>

  <Tab title="Store">
    Read from Store to access persisted user preferences:

    ```typescript  theme={null}
    import * as z from "zod";
    import { createAgent, tool, type ToolRuntime } from "langchain";

    const contextSchema = z.object({
      userId: z.string(),
    });

    const getPreference = tool(
      async ({ preferenceKey }, runtime: ToolRuntime) => {
        const userId = runtime.context.userId;

        // Read from Store: get existing preferences
        const store = runtime.store;
        const existingPrefs = await store.get(["preferences"], userId);

        if (existingPrefs) {
          const value = existingPrefs.value?.[preferenceKey];
          return value ? `${preferenceKey}: ${value}` : `No preference set for ${preferenceKey}`;
        } else {
          return "No preferences found";
        }
      },
      {
        name: "get_preference",
        description: "Get user preference from Store",
        schema: z.object({
          preferenceKey: z.string(),
        }),
      }
    );
    ```
  </Tab>

  <Tab title="Runtime Context">
    Read from Runtime Context for configuration like API keys and user IDs:

    ```typescript  theme={null}
    import * as z from "zod";
    import { tool } from "@langchain/core/tools";
    import { createAgent } from "langchain";

    const contextSchema = z.object({
      userId: z.string(),
      apiKey: z.string(),
      dbConnection: z.string(),
    });

    const fetchUserData = tool(
      async ({ query }, runtime: ToolRuntime<any, typeof contextSchema>) => {
        // Read from Runtime Context: get API key and DB connection
        const { userId, apiKey, dbConnection } = runtime.context;

        // Use configuration to fetch data
        const results = await performDatabaseQuery(dbConnection, query, apiKey);

        return `Found ${results.length} results for user ${userId}`;
      },
      {
        name: "fetch_user_data",
        description: "Fetch data using Runtime Context configuration",
        schema: z.object({
          query: z.string(),
        }),
      }
    );

    const agent = createAgent({
      model: "gpt-4o",
      tools: [fetchUserData],
      contextSchema,
    });
    ```
  </Tab>
</Tabs>

### Writes

Tool results can be used to help an agent complete a given task. Tools can both return results directly to the model
and update the memory of the agent to make important context available to future steps.

<Tabs>
  <Tab title="State">
    Write to State to track session-specific information using Command:

    ```typescript  theme={null}
    import * as z from "zod";
    import { tool } from "@langchain/core/tools";
    import { createAgent } from "langchain";
    import { Command } from "@langchain/langgraph";

    const authenticateUser = tool(
      async ({ password }) => {
        // Perform authentication
        if (password === "correct") {
          // Write to State: mark as authenticated using Command
          return new Command({
            update: { authenticated: true },
          });
        } else {
          return new Command({ update: { authenticated: false } });
        }
      },
      {
        name: "authenticate_user",
        description: "Authenticate user and update State",
        schema: z.object({
          password: z.string(),
        }),
      }
    );
    ```
  </Tab>

  <Tab title="Store">
    Write to Store to persist data across sessions:

    ```typescript  theme={null}
    import * as z from "zod";
    import { createAgent, tool, type ToolRuntime } from "langchain";

    const savePreference = tool(
      async ({ preferenceKey, preferenceValue }, runtime: ToolRuntime<any, typeof contextSchema>) => {
        const userId = runtime.context.userId;

        // Read existing preferences
        const store = runtime.store;
        const existingPrefs = await store.get(["preferences"], userId);

        // Merge with new preference
        const prefs = existingPrefs?.value || {};
        prefs[preferenceKey] = preferenceValue;

        // Write to Store: save updated preferences
        await store.put(["preferences"], userId, prefs);

        return `Saved preference: ${preferenceKey} = ${preferenceValue}`;
      },
      {
        name: "save_preference",
        description: "Save user preference to Store",
        schema: z.object({
          preferenceKey: z.string(),
          preferenceValue: z.string(),
        }),
      }
    );
    ```
  </Tab>
</Tabs>

See [Tools](/oss/javascript/langchain/tools) for comprehensive examples of accessing state, store, and runtime context in tools.

## Life-cycle context

Control what happens **between** the core agent steps - intercepting data flow to implement cross-cutting concerns like summarization, guardrails, and logging.

As you've seen in [Model Context](#model-context) and [Tool Context](#tool-context), [middleware](/oss/javascript/langchain/middleware) is the mechanism that makes context engineering practical. Middleware allows you to hook into any step in the agent lifecycle and either:

1. **Update context** - Modify state and store to persist changes, update conversation history, or save insights
2. **Jump in the lifecycle** - Move to different steps in the agent cycle based on context (e.g., skip tool execution if a condition is met, repeat model call with modified context)

<div style={{ display: "flex", justifyContent: "center" }}>
  <img src="https://mintcdn.com/langchain-5e9cc07a/RAP6mjwE5G00xYsA/oss/images/middleware_final.png?fit=max&auto=format&n=RAP6mjwE5G00xYsA&q=85&s=eb4404b137edec6f6f0c8ccb8323eaf1" alt="Middleware hooks in the agent loop" className="rounded-lg" data-og-width="500" width="500" data-og-height="560" height="560" data-path="oss/images/middleware_final.png" data-optimize="true" data-opv="3" srcset="https://mintcdn.com/langchain-5e9cc07a/RAP6mjwE5G00xYsA/oss/images/middleware_final.png?w=280&fit=max&auto=format&n=RAP6mjwE5G00xYsA&q=85&s=483413aa87cf93323b0f47c0dd5528e8 280w, https://mintcdn.com/langchain-5e9cc07a/RAP6mjwE5G00xYsA/oss/images/middleware_final.png?w=560&fit=max&auto=format&n=RAP6mjwE5G00xYsA&q=85&s=41b7dd647447978ff776edafe5f42499 560w, https://mintcdn.com/langchain-5e9cc07a/RAP6mjwE5G00xYsA/oss/images/middleware_final.png?w=840&fit=max&auto=format&n=RAP6mjwE5G00xYsA&q=85&s=e9b14e264f68345de08ae76f032c52d4 840w, https://mintcdn.com/langchain-5e9cc07a/RAP6mjwE5G00xYsA/oss/images/middleware_final.png?w=1100&fit=max&auto=format&n=RAP6mjwE5G00xYsA&q=85&s=ec45e1932d1279b1beee4a4b016b473f 1100w, https://mintcdn.com/langchain-5e9cc07a/RAP6mjwE5G00xYsA/oss/images/middleware_final.png?w=1650&fit=max&auto=format&n=RAP6mjwE5G00xYsA&q=85&s=3bca5ebf8aa56632b8a9826f7f112e57 1650w, https://mintcdn.com/langchain-5e9cc07a/RAP6mjwE5G00xYsA/oss/images/middleware_final.png?w=2500&fit=max&auto=format&n=RAP6mjwE5G00xYsA&q=85&s=437f141d1266f08a95f030c2804691d9 2500w" />
</div>

### Example: Summarization

One of the most common life-cycle patterns is automatically condensing conversation history when it gets too long. Unlike the transient message trimming shown in [Model Context](#messages), summarization **persistently updates state** - permanently replacing old messages with a summary that's saved for all future turns.

LangChain offers built-in middleware for this:

```typescript  theme={null}
import { createAgent, summarizationMiddleware } from "langchain";

const agent = createAgent({
  model: "gpt-4o",
  tools: [...],
  middleware: [
    summarizationMiddleware({
      model: "gpt-4o-mini",
      trigger: { tokens: 4000 },
      keep: { messages: 20 },
    }),
  ],
});
```

When the conversation exceeds the token limit, `SummarizationMiddleware` automatically:

1. Summarizes older messages using a separate LLM call
2. Replaces them with a summary message in State (permanently)
3. Keeps recent messages intact for context

The summarized conversation history is permanently updated - future turns will see the summary instead of the original messages.

<Note>
  For a complete list of built-in middleware, available hooks, and how to create custom middleware, see the [Middleware documentation](/oss/javascript/langchain/middleware).
</Note>

## Best practices

1. **Start simple** - Begin with static prompts and tools, add dynamics only when needed
2. **Test incrementally** - Add one context engineering feature at a time
3. **Monitor performance** - Track model calls, token usage, and latency
4. **Use built-in middleware** - Leverage [`SummarizationMiddleware`](/oss/javascript/langchain/middleware#summarization), [`LLMToolSelectorMiddleware`](/oss/javascript/langchain/middleware#llm-tool-selector), etc.
5. **Document your context strategy** - Make it clear what context is being passed and why
6. **Understand transient vs persistent**: Model context changes are transient (per-call), while life-cycle context changes persist to state

## Related resources

* [Context conceptual overview](/oss/javascript/concepts/context) - Understand context types and when to use them
* [Middleware](/oss/javascript/langchain/middleware) - Complete middleware guide
* [Tools](/oss/javascript/langchain/tools) - Tool creation and context access
* [Memory](/oss/javascript/concepts/memory) - Short-term and long-term memory patterns
* [Agents](/oss/javascript/langchain/agents) - Core agent concepts

***

<Callout icon="pen-to-square" iconType="regular">
  [Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/oss/langchain/context-engineering.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).
</Callout>

<Tip icon="terminal" iconType="regular">
  [Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.
</Tip>

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.langchain.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Model Context Protocol (MCP)

[Model Context Protocol (MCP)](https://modelcontextprotocol.io/introduction) is an open protocol that standardizes how applications provide tools and context to LLMs. LangChain agents can use tools defined on MCP servers using the [`@langchain/mcp-adapters`](https://github.com/langchain-ai/langchainjs/tree/main/libs/langchain-mcp-adapters) library.

## Quickstart

Install the `@langchain/mcp-adapters` library:

<CodeGroup>
  ```bash npm theme={null}
  npm install @langchain/mcp-adapters
  ```

  ```bash pnpm theme={null}
  pnpm add @langchain/mcp-adapters
  ```

  ```bash yarn theme={null}
  yarn add @langchain/mcp-adapters
  ```

  ```bash bun theme={null}
  bun add @langchain/mcp-adapters
  ```
</CodeGroup>

`@langchain/mcp-adapters` enables agents to use tools defined across one or more MCP servers.

<Note>
  `MultiServerMCPClient` is **stateless by default**. Each tool invocation creates a fresh MCP `ClientSession`, executes the tool, and then cleans up. See the [stateful sessions](#stateful-sessions) section for more details.
</Note>

```ts Accessing multiple MCP servers icon="server" theme={null}
import { MultiServerMCPClient } from "@langchain/mcp-adapters";  // [!code highlight]
import { ChatAnthropic } from "@langchain/anthropic";
import { createAgent } from "langchain";

const client = new MultiServerMCPClient({  // [!code highlight]
    math: {
        transport: "stdio",  // Local subprocess communication
        command: "node",
        // Replace with absolute path to your math_server.js file
        args: ["/path/to/math_server.js"],
    },
    weather: {
        transport: "http",  // HTTP-based remote server
        // Ensure you start your weather server on port 8000
        url: "http://localhost:8000/mcp",
    },
});

const tools = await client.getTools();  // [!code highlight]
const agent = createAgent({
    model: "claude-sonnet-4-5-20250929",
    tools,  // [!code highlight]
});

const mathResponse = await agent.invoke({
    messages: [{ role: "user", content: "what's (3 + 5) x 12?" }],
});

const weatherResponse = await agent.invoke({
    messages: [{ role: "user", content: "what is the weather in nyc?" }],
});
```

## Custom servers

To create your own MCP servers, you can use the `@modelcontextprotocol/sdk` library. This library provides a simple way to define [tools](https://modelcontextprotocol.io/docs/learn/server-concepts#tools-ai-actions) and run them as servers.

<CodeGroup>
  ```bash npm theme={null}
  npm install @modelcontextprotocol/sdk
  ```

  ```bash pnpm theme={null}
  pnpm add @modelcontextprotocol/sdk
  ```

  ```bash yarn theme={null}
  yarn add @modelcontextprotocol/sdk
  ```

  ```bash bun theme={null}
  bun add @modelcontextprotocol/sdk
  ```
</CodeGroup>

To test your agent with MCP tool servers, use the following examples:

```typescript title="Math server (stdio transport)" icon="floppy-disk" theme={null}
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const server = new Server(
    {
        name: "math-server",
        version: "0.1.0",
    },
    {
        capabilities: {
            tools: {},
        },
    }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
        {
            name: "add",
            description: "Add two numbers",
            inputSchema: {
                type: "object",
                properties: {
                    a: {
                        type: "number",
                        description: "First number",
                    },
                    b: {
                        type: "number",
                        description: "Second number",
                    },
                },
                required: ["a", "b"],
            },
        },
        {
            name: "multiply",
            description: "Multiply two numbers",
            inputSchema: {
                type: "object",
                properties: {
                    a: {
                        type: "number",
                        description: "First number",
                    },
                    b: {
                        type: "number",
                        description: "Second number",
                    },
                },
                required: ["a", "b"],
            },
        },
        ],
    };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
    switch (request.params.name) {
        case "add": {
            const { a, b } = request.params.arguments as { a: number; b: number };
            return {
                content: [
                {
                    type: "text",
                    text: String(a + b),
                },
                ],
            };
        }
        case "multiply": {
            const { a, b } = request.params.arguments as { a: number; b: number };
            return {
                content: [
                {
                    type: "text",
                    text: String(a * b),
                },
                ],
            };
        }
        default:
            throw new Error(`Unknown tool: ${request.params.name}`);
    }
});

async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Math MCP server running on stdio");
}

main();
```

```typescript title="Weather server (SSE transport)" icon="wifi" theme={null}
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import express from "express";

const app = express();
app.use(express.json());

const server = new Server(
    {
        name: "weather-server",
        version: "0.1.0",
    },
    {
        capabilities: {
            tools: {},
        },
    }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
        {
            name: "get_weather",
            description: "Get weather for location",
            inputSchema: {
            type: "object",
            properties: {
                location: {
                type: "string",
                description: "Location to get weather for",
                },
            },
            required: ["location"],
            },
        },
        ],
    };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
    switch (request.params.name) {
        case "get_weather": {
            const { location } = request.params.arguments as { location: string };
            return {
                content: [
                    {
                        type: "text",
                        text: `It's always sunny in ${location}`,
                    },
                ],
            };
        }
        default:
            throw new Error(`Unknown tool: ${request.params.name}`);
    }
});

app.post("/mcp", async (req, res) => {
    const transport = new SSEServerTransport("/mcp", res);
    await server.connect(transport);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Weather MCP server running on port ${PORT}`);
});
```

## Transports

MCP supports different transport mechanisms for client-server communication.

### HTTP

The `http` transport (also referred to as `streamable-http`) uses HTTP requests for client-server communication. See the [MCP HTTP transport specification](https://modelcontextprotocol.io/specification/2025-03-26/basic/transports#streamable-http) for more details.

```typescript  theme={null}
const client = new MultiServerMCPClient({
    weather: {
        transport: "sse",
        url: "http://localhost:8000/mcp",
    },
});
```

#### Passing headers

#### Authentication

### stdio

Client launches server as a subprocess and communicates via standard input/output. Best for local tools and simple setups.

<Note>
  Unlike HTTP transports, `stdio` connections are inherently **stateful**—the subprocess persists for the lifetime of the client connection. However, when using `MultiServerMCPClient` without explicit session management, each tool call still creates a new session. See [stateful sessions](#stateful-sessions) for managing persistent connections.
</Note>

```typescript  theme={null}
const client = new MultiServerMCPClient({
    math: {
        transport: "stdio",
        command: "node",
        args: ["/path/to/math_server.js"],
    },
});
```

## Core features

### Tools

[Tools](https://modelcontextprotocol.io/docs/concepts/tools) allow MCP servers to expose executable functions that LLMs can invoke to perform actions—such as querying databases, calling APIs, or interacting with external systems. LangChain converts MCP tools into LangChain [tools](/oss/javascript/langchain/tools), making them directly usable in any LangChain agent or workflow.

#### Loading tools

Use `client.get_tools()` to retrieve tools from MCP servers and pass them to your agent:

```typescript  theme={null}
import { MultiServerMCPClient } from "@langchain/mcp-adapters";
import { createAgent } from "langchain";

const client = new MultiServerMCPClient({...});
const tools = await client.getTools();  // [!code highlight]
const agent = createAgent({ model: "claude-sonnet-4-5-20250929", tools });
```

## Additional resources

* [MCP documentation](https://modelcontextprotocol.io/introduction)

* [MCP Transport documentation](https://modelcontextprotocol.io/docs/concepts/transports)

* [`@langchain/mcp-adapters`](https://github.com/langchain-ai/langchainjs/tree/main/libs/langchain-mcp-adapters/)

***

<Callout icon="pen-to-square" iconType="regular">
  [Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/oss/langchain/mcp.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).
</Callout>

<Tip icon="terminal" iconType="regular">
  [Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.
</Tip>

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.langchain.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Human-in-the-loop

The Human-in-the-Loop (HITL) [middleware](/oss/javascript/langchain/middleware/built-in#human-in-the-loop) lets you add human oversight to agent tool calls.
When a model proposes an action that might require review — for example, writing to a file or executing SQL — the middleware can pause execution and wait for a decision.

It does this by checking each tool call against a configurable policy. If intervention is needed, the middleware issues an [interrupt](https://reference.langchain.com/javascript/functions/_langchain_langgraph.index.interrupt.html) that halts execution. The graph state is saved using LangGraph's [persistence layer](/oss/javascript/langgraph/persistence), so execution can pause safely and resume later.

A human decision then determines what happens next: the action can be approved as-is (`approve`), modified before running (`edit`), or rejected with feedback (`reject`).

## Interrupt decision types

The [middleware](/oss/javascript/langchain/middleware/built-in#human-in-the-loop) defines three built-in ways a human can respond to an interrupt:

| Decision Type | Description                                                               | Example Use Case                                    |
| ------------- | ------------------------------------------------------------------------- | --------------------------------------------------- |
| ✅ `approve`   | The action is approved as-is and executed without changes.                | Send an email draft exactly as written              |
| ✏️ `edit`     | The tool call is executed with modifications.                             | Change the recipient before sending an email        |
| ❌ `reject`    | The tool call is rejected, with an explanation added to the conversation. | Reject an email draft and explain how to rewrite it |

The available decision types for each tool depend on the policy you configure in `interrupt_on`.
When multiple tool calls are paused at the same time, each action requires a separate decision.
Decisions must be provided in the same order as the actions appear in the interrupt request.

<Tip>
  When **editing** tool arguments, make changes conservatively. Significant modifications to the original arguments may cause the model to re-evaluate its approach and potentially execute the tool multiple times or take unexpected actions.
</Tip>

## Configuring interrupts

To use HITL, add the [middleware](/oss/javascript/langchain/middleware/built-in#human-in-the-loop) to the agent's `middleware` list when creating the agent.

You configure it with a mapping of tool actions to the decision types that are allowed for each action. The middleware will interrupt execution when a tool call matches an action in the mapping.

```ts  theme={null}
import { createAgent, humanInTheLoopMiddleware } from "langchain"; // [!code highlight]
import { MemorySaver } from "@langchain/langgraph"; // [!code highlight]

const agent = createAgent({
    model: "gpt-4o",
    tools: [writeFileTool, executeSQLTool, readDataTool],
    middleware: [
        humanInTheLoopMiddleware({
            interruptOn: {
                write_file: true, // All decisions (approve, edit, reject) allowed
                execute_sql: {
                    allowedDecisions: ["approve", "reject"],
                    // No editing allowed
                    description: "🚨 SQL execution requires DBA approval",
                },
                // Safe operation, no approval needed
                read_data: false,
            },
            // Prefix for interrupt messages - combined with tool name and args to form the full message
            // e.g., "Tool execution pending approval: execute_sql with query='DELETE FROM...'"
            // Individual tools can override this by specifying a "description" in their interrupt config
            descriptionPrefix: "Tool execution pending approval",
        }),
    ],
    // Human-in-the-loop requires checkpointing to handle interrupts.
    // In production, use a persistent checkpointer like AsyncPostgresSaver.
    checkpointer: new MemorySaver(), // [!code highlight]
});
```

<Info>
  You must configure a checkpointer to persist the graph state across interrupts.
  In production, use a persistent checkpointer like [`AsyncPostgresSaver`](https://reference.langchain.com/javascript/classes/_langchain_langgraph-checkpoint-postgres.AsyncPostgresSaver.html). For testing or prototyping, use [`InMemorySaver`](https://reference.langchain.com/javascript/classes/_langchain_langgraph-checkpoint.MemorySaver.html).

  When invoking the agent, pass a `config` that includes the **thread ID** to associate execution with a conversation thread.
  See the [LangGraph interrupts documentation](/oss/javascript/langgraph/interrupts) for details.
</Info>

<Accordion title="Configuration options">
  <ParamField body="interruptOn" type="object" required>
    Mapping of tool names to approval configs
  </ParamField>

  **Tool approval config options:**

  <ParamField body="allowAccept" type="boolean" default="false">
    Whether approval is allowed
  </ParamField>

  <ParamField body="allowEdit" type="boolean" default="false">
    Whether editing is allowed
  </ParamField>

  <ParamField body="allowRespond" type="boolean" default="false">
    Whether responding/rejection is allowed
  </ParamField>
</Accordion>

## Responding to interrupts

When you invoke the agent, it runs until it either completes or an interrupt is raised. An interrupt is triggered when a tool call matches the policy you configured in `interrupt_on`. In that case, the invocation result will include an `__interrupt__` field with the actions that require review. You can then present those actions to a reviewer and resume execution once decisions are provided.

```typescript  theme={null}
import { HumanMessage } from "@langchain/core/messages";
import { Command } from "@langchain/langgraph";

// You must provide a thread ID to associate the execution with a conversation thread,
// so the conversation can be paused and resumed (as is needed for human review).
const config = { configurable: { thread_id: "some_id" } }; // [!code highlight]

// Run the graph until the interrupt is hit.
const result = await agent.invoke(
    {
        messages: [new HumanMessage("Delete old records from the database")],
    },
    config // [!code highlight]
);


// The interrupt contains the full HITL request with action_requests and review_configs
console.log(result.__interrupt__);
// > [
// >    Interrupt(
// >       value: {
// >          action_requests: [
// >             {
// >                name: 'execute_sql',
// >                arguments: { query: 'DELETE FROM records WHERE created_at < NOW() - INTERVAL \'30 days\';' },
// >                description: 'Tool execution pending approval\n\nTool: execute_sql\nArgs: {...}'
// >             }
// >          ],
// >          review_configs: [
// >             {
// >                action_name: 'execute_sql',
// >                allowed_decisions: ['approve', 'reject']
// >             }
// >          ]
// >       }
// >    )
// > ]

// Resume with approval decision
await agent.invoke(
    new Command({ // [!code highlight]
        resume: { decisions: [{ type: "approve" }] }, // or "reject" [!code highlight]
    }), // [!code highlight]
    config // Same thread ID to resume the paused conversation
);
```

### Decision types

<Tabs>
  <Tab title="✅ approve">
    Use `approve` to approve the tool call as-is and execute it without changes.

    ```typescript  theme={null}
    await agent.invoke(
        new Command({
            // Decisions are provided as a list, one per action under review.
            // The order of decisions must match the order of actions
            // listed in the `__interrupt__` request.
            resume: {
                decisions: [
                    {
                        type: "approve",
                    }
                ]
            }
        }),
        config  // Same thread ID to resume the paused conversation
    );
    ```
  </Tab>

  <Tab title="✏️ edit">
    Use `edit` to modify the tool call before execution.
    Provide the edited action with the new tool name and arguments.

    ```typescript  theme={null}
    await agent.invoke(
        new Command({
            // Decisions are provided as a list, one per action under review.
            // The order of decisions must match the order of actions
            // listed in the `__interrupt__` request.
            resume: {
                decisions: [
                    {
                        type: "edit",
                        // Edited action with tool name and args
                        editedAction: {
                            // Tool name to call.
                            // Will usually be the same as the original action.
                            name: "new_tool_name",
                            // Arguments to pass to the tool.
                            args: { key1: "new_value", key2: "original_value" },
                        }
                    }
                ]
            }
        }),
        config  // Same thread ID to resume the paused conversation
    );
    ```

    <Tip>
      When **editing** tool arguments, make changes conservatively. Significant modifications to the original arguments may cause the model to re-evaluate its approach and potentially execute the tool multiple times or take unexpected actions.
    </Tip>
  </Tab>

  <Tab title="❌ reject">
    Use `reject` to reject the tool call and provide feedback instead of execution.

    ```typescript  theme={null}
    await agent.invoke(
        new Command({
            // Decisions are provided as a list, one per action under review.
            // The order of decisions must match the order of actions
            // listed in the `__interrupt__` request.
            resume: {
                decisions: [
                    {
                        type: "reject",
                        // An explanation about why the action was rejected
                        message: "No, this is wrong because ..., instead do this ...",
                    }
                ]
            }
        }),
        config  // Same thread ID to resume the paused conversation
    );
    ```

    The `message` is added to the conversation as feedback to help the agent understand why the action was rejected and what it should do instead.

    ***

    ### Multiple decisions

    When multiple actions are under review, provide a decision for each action in the same order as they appear in the interrupt:

    ```typescript  theme={null}
    {
        decisions: [
            { type: "approve" },
            {
                type: "edit",
                editedAction: {
                    name: "tool_name",
                    args: { param: "new_value" }
                }
            },
            {
                type: "reject",
                message: "This action is not allowed"
            }
        ]
    }
    ```
  </Tab>
</Tabs>

## Streaming with human-in-the-loop

You can use `stream()` instead of `invoke()` to get real-time updates while the agent runs and handles interrupts. Use `stream_mode=['updates', 'messages']` to stream both agent progress and LLM tokens.

```typescript  theme={null}
import { Command } from "@langchain/langgraph";

const config = { configurable: { thread_id: "some_id" } };

// Stream agent progress and LLM tokens until interrupt
for await (const [mode, chunk] of await agent.stream(
    { messages: [{ role: "user", content: "Delete old records from the database" }] },
    { ...config, streamMode: ["updates", "messages"] }  // [!code highlight]
)) {
    if (mode === "messages") {
        // LLM token
        const [token, metadata] = chunk;
        if (token.content) {
            process.stdout.write(token.content);
        }
    } else if (mode === "updates") {
        // Check for interrupt
        if ("__interrupt__" in chunk) {
            console.log(`\n\nInterrupt: ${JSON.stringify(chunk.__interrupt__)}`);
        }
    }
}

// Resume with streaming after human decision
for await (const [mode, chunk] of await agent.stream(
    new Command({ resume: { decisions: [{ type: "approve" }] } }),
    { ...config, streamMode: ["updates", "messages"] }
)) {
    if (mode === "messages") {
        const [token, metadata] = chunk;
        if (token.content) {
            process.stdout.write(token.content);
        }
    }
}
```

See the [Streaming](/oss/javascript/langchain/streaming) guide for more details on stream modes.

## Execution lifecycle

The middleware defines an `after_model` hook that runs after the model generates a response but before any tool calls are executed:

1. The agent invokes the model to generate a response.
2. The middleware inspects the response for tool calls.
3. If any calls require human input, the middleware builds a `HITLRequest` with `action_requests` and `review_configs` and calls [interrupt](https://reference.langchain.com/javascript/functions/_langchain_langgraph.index.interrupt.html).
4. The agent waits for human decisions.
5. Based on the `HITLResponse` decisions, the middleware executes approved or edited calls, synthesizes [ToolMessage](https://reference.langchain.com/javascript/classes/_langchain_core.messages.ToolMessage.html)'s for rejected calls, and resumes execution.

## Custom HITL logic

For more specialized workflows, you can build custom HITL logic directly using the [interrupt](https://reference.langchain.com/javascript/functions/_langchain_langgraph.index.interrupt.html) primitive and [middleware](/oss/javascript/langchain/middleware) abstraction.

Review the [execution lifecycle](#execution-lifecycle) above to understand how to integrate interrupts into the agent's operation.

***

<Callout icon="pen-to-square" iconType="regular">
  [Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/oss/langchain/human-in-the-loop.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).
</Callout>

<Tip icon="terminal" iconType="regular">
  [Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.
</Tip>

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.langchain.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Custom workflow

In the **custom workflow** architecture, you define your own bespoke execution flow using [LangGraph](/oss/javascript/langgraph/overview). You have complete control over the graph structure—including sequential steps, conditional branches, loops, and parallel execution.

```mermaid  theme={null}
graph LR
    A([Input]) --> B{{Conditional}}
    B -->|path_a| C[Deterministic step]
    B -->|path_b| D((Agentic step))
    C --> G([Output])
    D --> G([Output])
```

## Key characteristics

* Complete control over graph structure
* Mix deterministic logic with agentic behavior
* Support for sequential steps, conditional branches, loops, and parallel execution
* Embed other patterns as nodes in your workflow

## When to use

Use custom workflows when standard patterns (subagents, skills, etc.) don't fit your requirements, you need to mix deterministic logic with agentic behavior, or your use case requires complex routing or multi-stage processing.

Each node in your workflow can be a simple function, an LLM call, or an entire [agent](/oss/javascript/langchain/agents) with [tools](/oss/javascript/langchain/tools). You can also compose other architectures within a custom workflow—for example, embedding a multi-agent system as a single node.

For a complete example of a custom workflow, see the tutorial below.

<Card title="Tutorial: Build a multi-source knowledge base with routing" icon="book" href="/oss/javascript/langchain/multi-agent/router-knowledge-base" arrow cta="Learn more">
  The [router pattern](/oss/javascript/langchain/multi-agent/router) is an example of a custom workflow. This tutorial walks through building a router that queries GitHub, Notion, and Slack in parallel, then synthesizes results.

  >
</Card>

## Basic implementation

The core insight is that you can call a LangChain agent directly inside any LangGraph node, combining the flexibility of custom workflows with the convenience of pre-built agents:

```typescript  theme={null}
import { z } from "zod";
import { createAgent } from "langchain";
import { StateGraph, START, END, MessagesZodState } from "@langchain/langgraph";

const agent = createAgent({ model: "openai:gpt-4o", tools: [...] });
const State = MessagesZodState.extend({
  query: z.string(),
});

async function agentNode(state: z.infer<typeof State>) {
  // A LangGraph node that invokes a LangChain agent
  const result = await agent.invoke({
    messages: [{ role: "user", content: state.query }]
  });
  return { answer: result.messages.at(-1)?.content };
}

// Build a simple workflow
const workflow = new StateGraph(State)
  .addNode("agent", agentNode)
  .addEdge(START, "agent")
  .addEdge("agent", END)
  .compile();
```

## Example: RAG pipeline

A common use case is combining [retrieval](/oss/javascript/langchain/retrieval) with an agent. This example builds a WNBA stats assistant that retrieves from a knowledge base and can fetch live news.

<Accordion title="Custom RAG workflow">
  The workflow demonstrates three types of nodes:

  * **Model node** (Rewrite): Rewrites the user query for better retrieval using [structured output](/oss/javascript/langchain/structured-output).
  * **Deterministic node** (Retrieve): Performs vector similarity search — no LLM involved.
  * **Agent node** (Agent): Reasons over retrieved context and can fetch additional information via tools.

  ```mermaid  theme={null}
  graph LR
      A([Query]) --> B{{Rewrite}}
      B --> C[(Retrieve)]
      C --> D((Agent))
      D --> E([Response])
  ```

  <Tip>
    You can use LangGraph state to pass information between workflow steps. This allows each part of your workflow to read and update structured fields, making it easy to share data and context across nodes.
  </Tip>

  ```typescript  theme={null}
  import { StateGraph, Annotation, START, END } from "@langchain/langgraph";
  import { createAgent, tool } from "langchain";
  import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
  import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory";
  import * as z from "zod";

  const State = Annotation.Root({
    question: Annotation<string>(),
    rewrittenQuery: Annotation<string>(),
    documents: Annotation<string[]>(),
    answer: Annotation<string>(),
  });

  // WNBA knowledge base with rosters, game results, and player stats
  const embeddings = new OpenAIEmbeddings();
  const vectorStore = await MemoryVectorStore.fromTexts(
    [
      // Rosters
      "New York Liberty 2024 roster: Breanna Stewart, Sabrina Ionescu, Jonquel Jones, Courtney Vandersloot.",
      "Las Vegas Aces 2024 roster: A'ja Wilson, Kelsey Plum, Jackie Young, Chelsea Gray.",
      "Indiana Fever 2024 roster: Caitlin Clark, Aliyah Boston, Kelsey Mitchell, NaLyssa Smith.",
      // Game results
      "2024 WNBA Finals: New York Liberty defeated Minnesota Lynx 3-2 to win the championship.",
      "June 15, 2024: Indiana Fever 85, Chicago Sky 79. Caitlin Clark had 23 points and 8 assists.",
      "August 20, 2024: Las Vegas Aces 92, Phoenix Mercury 84. A'ja Wilson scored 35 points.",
      // Player stats
      "A'ja Wilson 2024 season stats: 26.9 PPG, 11.9 RPG, 2.6 BPG. Won MVP award.",
      "Caitlin Clark 2024 rookie stats: 19.2 PPG, 8.4 APG, 5.7 RPG. Won Rookie of the Year.",
      "Breanna Stewart 2024 stats: 20.4 PPG, 8.5 RPG, 3.5 APG.",
    ],
    [{}, {}, {}, {}, {}, {}, {}, {}, {}],
    embeddings
  );
  const retriever = vectorStore.asRetriever({ k: 5 });

  const getLatestNews = tool(
    async ({ query }) => {
      // Your news API here
      return "Latest: The WNBA announced expanded playoff format for 2025...";
    },
    {
      name: "get_latest_news",
      description: "Get the latest WNBA news and updates",
      schema: z.object({ query: z.string() }),
    }
  );

  const agent = createAgent({
    model: "openai:gpt-4o",
    tools: [getLatestNews],
  });

  const model = new ChatOpenAI({ model: "gpt-4o" });

  const RewrittenQuery = z.object({ query: z.string() });

  async function rewriteQuery(state: typeof State.State) {
    const systemPrompt = `Rewrite this query to retrieve relevant WNBA information.
  The knowledge base contains: team rosters, game results with scores, and player statistics (PPG, RPG, APG).
  Focus on specific player names, team names, or stat categories mentioned.`;
    const response = await model.withStructuredOutput(RewrittenQuery).invoke([
      { role: "system", content: systemPrompt },
      { role: "user", content: state.question },
    ]);
    return { rewrittenQuery: response.query };
  }

  async function retrieve(state: typeof State.State) {
    const docs = await retriever.invoke(state.rewrittenQuery);
    return { documents: docs.map((doc) => doc.pageContent) };
  }

  async function callAgent(state: typeof State.State) {
    const context = state.documents.join("\n\n");
    const prompt = `Context:\n${context}\n\nQuestion: ${state.question}`;
    const response = await agent.invoke({
      messages: [{ role: "user", content: prompt }],
    });
    return { answer: response.messages.at(-1)?.contentBlocks };
  }

  const workflow = new StateGraph(State)
    .addNode("rewrite", rewriteQuery)
    .addNode("retrieve", retrieve)
    .addNode("agent", callAgent)
    .addEdge(START, "rewrite")
    .addEdge("rewrite", "retrieve")
    .addEdge("retrieve", "agent")
    .addEdge("agent", END)
    .compile();

  const result = await workflow.invoke({
    question: "Who won the 2024 WNBA Championship?",
  });
  console.log(result.answer);
  ```
</Accordion>

***

<Callout icon="pen-to-square" iconType="regular">
  [Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/oss/langchain/multi-agent/custom-workflow.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).
</Callout>

<Tip icon="terminal" iconType="regular">
  [Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.
</Tip>

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.langchain.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Router

In the **router** architecture, a routing step classifies input and directs it to specialized [agents](/oss/javascript/langchain/agents). This is useful when you have distinct **verticals**—separate knowledge domains that each require their own agent.

```mermaid  theme={null}
graph LR
    A([Query]) --> B[Router]
    B --> C[Agent A]
    B --> D[Agent B]
    B --> E[Agent C]
    C --> F[Synthesize]
    D --> F
    E --> F
    F --> G([Combined answer])
```

## Key characteristics

* Router decomposes the query
* Zero or more specialized agents are invoked in parallel
* Results are synthesized into a coherent response

## When to use

Use the router pattern when you have distinct verticals (separate knowledge domains that each require their own agent), need to query multiple sources in parallel, and want to synthesize results into a combined response.

## Basic implementation

The router classifies the query and directs it to the appropriate agent(s). Use [`Command`](/oss/javascript/langgraph/graph-api#command) for single-agent routing or [`Send`](/oss/javascript/langgraph/graph-api#send) for parallel fan-out to multiple agents.

<Tabs>
  <Tab title="Single agent">
    Use `Command` to route to a single specialized agent:

    ```typescript  theme={null}
    import { z } from "zod";
    import { Command } from "@langchain/langgraph";

    const ClassificationResult = z.object({
      query: z.string(),
      agent: z.string(),
    });

    function classifyQuery(query: string): z.infer<typeof ClassificationResult> {
      // Use LLM to classify query and determine the appropriate agent
      // Classification logic here
      ...
    }

    function routeQuery(state: z.infer<typeof ClassificationResult>) {
      const classification = classifyQuery(state.query);

      // Route to the selected agent
      return new Command({ goto: classification.agent });
    }
    ```
  </Tab>

  <Tab title="Multiple agents (parallel)">
    Use `Send` to fan out to multiple specialized agents in parallel:

    ```typescript  theme={null}
    import { z } from "zod";
    import { Command } from "@langchain/langgraph";

    const ClassificationResult = z.object({
      query: z.string(),
      agent: z.string(),
    });

    function classifyQuery(query: string): z.infer<typeof ClassificationResult>[] {
      // Use LLM to classify query and determine the appropriate agent
      // Classification logic here
      ...
    }

    function routeQuery(state: typeof State.State) {
      const classifications = classifyQuery(state.query);

      // Fan out to selected agents in parallel
      return classifications.map(
        (c) => new Send(c.agent, { query: c.query })
      );
    }
    ```
  </Tab>
</Tabs>

For a complete implementation, see the tutorial below.

<Card title="Tutorial: Build a multi-source knowledge base with routing" icon="book" href="/oss/javascript/langchain/multi-agent/router-knowledge-base">
  Build a router that queries GitHub, Notion, and Slack in parallel, then synthesizes results into a coherent answer. Covers state definition, specialized agents, parallel execution with `Send`, and result synthesis.
</Card>

## Stateless vs. stateful

Two approaches:

* [**Stateless routers**](#stateless) address each request independently
* [**Stateful routers**](#stateful) maintain conversation history across requests

## Stateless

Each request is routed independently—no memory between calls. For multi-turn conversations, see [Stateful routers](#stateful).

<Tip>
  **Router vs. Subagents**: Both patterns can dispatch work to multiple agents, but they differ in how routing decisions are made:

  * **Router**: A dedicated routing step (often a single LLM call or rule-based logic) that classifies the input and dispatches to agents. The router itself typically doesn't maintain conversation history or perform multi-turn orchestration—it's a preprocessing step.
  * **Subagents**: An main supervisor agent dynamically decides which [subagents](/oss/javascript/langchain/multi-agent/subagents) to call as part of an ongoing conversation. The main agent maintains context, can call multiple subagents across turns, and orchestrates complex multi-step workflows.

  Use a **router** when you have clear input categories and want deterministic or lightweight classification. Use a **supervisor** when you need flexible, conversation-aware orchestration where the LLM decides what to do next based on evolving context.
</Tip>

## Stateful

For multi-turn conversations, you need to maintain context across invocations.

### Tool wrapper

The simplest approach: wrap the stateless router as a tool that a conversational agent can call. The conversational agent handles memory and context; the router stays stateless. This avoids the complexity of managing conversation history across multiple parallel agents.

```typescript  theme={null}
const searchDocs = tool(
  async ({ query }) => {
    const result = await workflow.invoke({ query }); // [!code highlight]
    return result.finalAnswer;
  },
  {
    name: "search_docs",
    description: "Search across multiple documentation sources",
    schema: z.object({
      query: z.string().describe("The search query"),
    }),
  }
);

// Conversational agent uses the router as a tool
const conversationalAgent = createAgent({
  model,
  tools: [searchDocs],
  systemPrompt: "You are a helpful assistant. Use search_docs to answer questions.",
});
```

### Full persistence

If you need the router itself to maintain state, use [persistence](/oss/javascript/langchain/short-term-memory) to store message history. When routing to an agent, fetch previous messages from state and selectively include them in the agent's context—this is a lever for [context engineering](/oss/javascript/langchain/context-engineering).

<Warning>
  **Stateful routers require custom history management.** If the router switches between agents across turns, conversations may not feel fluid to end users when agents have different tones or prompts. With parallel invocation, you'll need to maintain history at the router level (inputs and synthesized outputs) and leverage this history in routing logic. Consider the [handoffs pattern](/oss/javascript/langchain/multi-agent/handoffs) or [subagents pattern](/oss/javascript/langchain/multi-agent/subagents) instead—both provide clearer semantics for multi-turn conversations.
</Warning>

***

<Callout icon="pen-to-square" iconType="regular">
  [Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/oss/langchain/multi-agent/router.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).
</Callout>

<Tip icon="terminal" iconType="regular">
  [Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.
</Tip>

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.langchain.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Skills

In the **skills** architecture, specialized capabilities are packaged as invokable "skills" that augment an [agent's](/oss/javascript/langchain/agents) behavior. Skills are primarily prompt-driven specializations that an agent can invoke on-demand.
For built-in skill support, see [Deep Agents](/oss/javascript/deepagents/skills).

<Tip>
  This pattern is conceptually identical to [llms.txt](https://llmstxt.org/) (introduced by Jeremy Howard), which uses tool calling for progressive disclosure of documentation. The skills pattern applies the same approach to specialized prompts and domain knowledge rather than just documentation pages.
</Tip>

```mermaid  theme={null}
graph LR
    A[User] --> B[Agent]
    B --> C[Skill A]
    B --> D[Skill B]
    B --> E[Skill C]
    B --> A
```

## Key characteristics

* Prompt-driven specialization: Skills are primarily defined by specialized prompts
* Progressive disclosure: Skills become available based on context or user needs
* Team distribution: Different teams can develop and maintain skills independently
* Lightweight composition: Skills are simpler than full sub-agents

## When to use

Use the skills pattern when you want a single [agent](/oss/javascript/langchain/agents) with many possible specializations, you don't need to enforce specific constraints between skills, or different teams need to develop capabilities independently. Common examples include coding assistants (skills for different languages or tasks), knowledge bases (skills for different domains), and creative assistants (skills for different formats).

## Basic implementation

```typescript  theme={null}
import { tool, createAgent } from "langchain";
import * as z from "zod";

const loadSkill = tool(
  async ({ skillName }) => {
    // Load skill content from file/database
    return "";
  },
  {
    name: "load_skill",
    description: `Load a specialized skill.

Available skills:
- write_sql: SQL query writing expert
- review_legal_doc: Legal document reviewer

Returns the skill's prompt and context.`,
    schema: z.object({
      skillName: z
        .string()
        .describe("Name of skill to load")
    })
  }
);

const agent = createAgent({
  model: "gpt-4o",
  tools: [loadSkill],
  systemPrompt: (
    "You are a helpful assistant. " +
    "You have access to two skills: " +
    "write_sql and review_legal_doc. " +
    "Use load_skill to access them."
  ),
});
```

For a complete implementation, see the tutorial below.

<Card title="Tutorial: Build a SQL assistant with on-demand skills" icon="wand-magic-sparkles" href="/oss/javascript/langchain/multi-agent/skills-sql-assistant" arrow cta="Learn more">
  Learn how to implement skills with progressive disclosure, where the agent loads specialized prompts and schemas on-demand rather than upfront.
</Card>

## Extending the pattern

When writing custom implementations, you can extend the basic skills pattern in several ways:

* **Dynamic tool registration**: Combine progressive disclosure with state management to register new [tools](/oss/javascript/langchain/tools) as skills load. For example, loading a "database\_admin" skill could both add specialized context and register database-specific tools (backup, restore, migrate). This uses the same tool-and-state mechanisms used across multi-agent patterns—tools updating state to dynamically change agent capabilities.

* **Hierarchical skills**: Skills can define other skills in a tree structure, creating nested specializations. For instance, loading a "data\_science" skill might make available sub-skills like "pandas\_expert", "visualization", and "statistical\_analysis". Each sub-skill can be loaded independently as needed, allowing for fine-grained progressive disclosure of domain knowledge. This hierarchical approach helps manage large knowledge bases by organizing capabilities into logical groupings that can be discovered and loaded on-demand.

***

<Callout icon="pen-to-square" iconType="regular">
  [Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/oss/langchain/multi-agent/skills.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).
</Callout>

<Tip icon="terminal" iconType="regular">
  [Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.
</Tip>

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.langchain.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Handoffs

In the **handoffs** architecture, behavior changes dynamically based on state. The core mechanism: [tools](/oss/javascript/langchain/tools) update a state variable (e.g., `current_step` or `active_agent`) that persists across turns, and the system reads this variable to adjust behavior—either applying different configuration (system prompt, tools) or routing to a different [agent](/oss/javascript/langchain/agents). This pattern supports both handoffs between distinct agents and dynamic configuration changes within a single agent.

<Tip>
  The term **handoffs** was coined by [OpenAI](https://openai.github.io/openai-agents-python/handoffs/) for using tool calls (e.g., `transfer_to_sales_agent`) to transfer control between agents or states.
</Tip>

```mermaid  theme={null}
sequenceDiagram
    participant User
    participant Agent
    participant Workflow State

    User->>Agent: "My phone is broken"
    Note over Agent,Workflow State: Step: Get warranty status<br/>Tools: record_warranty_status
    Agent-->>User: "Is your device under warranty?"

    User->>Agent: "Yes, it's still under warranty"
    Agent->>Workflow State: record_warranty_status("in_warranty")
    Note over Agent,Workflow State: Step: Classify issue<br/>Tools: record_issue_type
    Agent-->>User: "Can you describe the issue?"

    User->>Agent: "The screen is cracked"
    Agent->>Workflow State: record_issue_type("hardware")
    Note over Agent,Workflow State: Step: Provide resolution<br/>Tools: provide_solution, escalate_to_human
    Agent-->>User: "Here's the warranty repair process..."
```

## Key characteristics

* State-driven behavior: Behavior changes based on a state variable (e.g., `current_step` or `active_agent`)
* Tool-based transitions: Tools update the state variable to move between states
* Direct user interaction: Each state's configuration handles user messages directly
* Persistent state: State survives across conversation turns

## When to use

Use the handoffs pattern when you need to enforce sequential constraints (unlock capabilities only after preconditions are met), the agent needs to converse directly with the user across different states, or you're building multi-stage conversational flows. This pattern is particularly valuable for customer support scenarios where you need to collect information in a specific sequence — for example, collecting a warranty ID before processing a refund.

## Basic implementation

The core mechanism is a [tool](/oss/javascript/langchain/tools) that returns a [`Command`](/oss/javascript/langgraph/graph-api#command) to update state, triggering a transition to a new step or agent:

```typescript  theme={null}
import { tool, ToolMessage, type ToolRuntime } from "langchain";
import { Command } from "@langchain/langgraph";
import { z } from "zod";

const transferToSpecialist = tool(
  async (_, config: ToolRuntime<typeof StateSchema>) => {
    return new Command({
      update: {
        messages: [
          new ToolMessage({  // [!code highlight]
            content: "Transferred to specialist",
            tool_call_id: config.toolCallId  // [!code highlight]
          })
        ],
        currentStep: "specialist"  // Triggers behavior change
      }
    });
  },
  {
    name: "transfer_to_specialist",
    description: "Transfer to the specialist agent.",
    schema: z.object({})
  }
);
```

<Note>
  **Why include a `ToolMessage`?** When an LLM calls a tool, it expects a response. The `ToolMessage` with matching `tool_call_id` completes this request-response cycle—without it, the conversation history becomes malformed. This is required whenever your handoff tool updates messages.
</Note>

For a complete implementation, see the tutorial below.

<Card title="Tutorial: Build customer support with handoffs" icon="people-arrows" href="/oss/javascript/langchain/multi-agent/handoffs-customer-support" arrow cta="Learn more">
  Learn how to build a customer support agent using the handoffs pattern, where a single agent transitions between different configurations.
</Card>

## Implementation approaches

There are two ways to implement handoffs: **[single agent with middleware](#single-agent-with-middleware)** (one agent with dynamic configuration) or **[multiple agent subgraphs](#multiple-agent-subgraphs)** (distinct agents as graph nodes).

### Single agent with middleware

A single agent changes its behavior based on state. Middleware intercepts each model call and dynamically adjusts the system prompt and available tools. Tools update the state variable to trigger transitions:

```typescript  theme={null}
import { tool, ToolMessage, type ToolRuntime } from "langchain";
import { Command } from "@langchain/langgraph";
import { z } from "zod";

const recordWarrantyStatus = tool(
  async ({ status }, config: ToolRuntime<typeof StateSchema>) => {
    return new Command({
      update: {
        messages: [
          new ToolMessage({
            content: `Warranty status recorded: ${status}`,
            tool_call_id: config.toolCallId,
          }),
        ],
        warrantyStatus: status,
        currentStep: "specialist", // Update state to trigger transition
      },
    });
  },
  {
    name: "record_warranty_status",
    description: "Record warranty status and transition to next step.",
    schema: z.object({
      status: z.string(),
    }),
  }
);
```

<Accordion title="Complete example: Customer support with middleware">
  ```typescript  theme={null}
  import {
    createAgent,
    createMiddleware,
    tool,
    ToolMessage,
    type ToolRuntime,
  } from "langchain";
  import { Command, MemorySaver } from "@langchain/langgraph";
  import { z } from "zod";

  // 1. Define state with current_step tracker
  const SupportState = z.object({ // [!code highlight]
    currentStep: z.string().default("triage"), // [!code highlight]
    warrantyStatus: z.string().optional(),
  });

  // 2. Tools update currentStep via Command
  const recordWarrantyStatus = tool(
    async ({ status }, config: ToolRuntime<typeof SupportState>) => {
      return new Command({ // [!code highlight]
        update: { // [!code highlight]
          messages: [ // [!code highlight]
            new ToolMessage({
              content: `Warranty status recorded: ${status}`,
              tool_call_id: config.toolCallId,
            }),
          ],
          warrantyStatus: status,
          // Transition to next step
          currentStep: "specialist", // [!code highlight]
        },
      });
    },
    {
      name: "record_warranty_status",
      description: "Record warranty status and transition",
      schema: z.object({ status: z.string() }),
    }
  );

  // 3. Middleware applies dynamic configuration based on currentStep
  const applyStepConfig = createMiddleware({
    name: "applyStepConfig",
    stateSchema: SupportState, // [!code highlight]
    wrapModelCall: async (request, handler) => {
      const step = request.state.currentStep || "triage"; // [!code highlight]

      // Map steps to their configurations
      const configs = {
        triage: {
          prompt: "Collect warranty information...",
          tools: [recordWarrantyStatus],
        },
        specialist: {
          prompt: `Provide solutions based on warranty: ${request.state.warrantyStatus}`,
          tools: [provideSolution, escalate],
        },
      };

      const config = configs[step as keyof typeof configs];
      return handler({
        ...request,
        systemPrompt: config.prompt,
        tools: config.tools,
      });
    },
  });

  // 4. Create agent with middleware
  const agent = createAgent({
    model,
    tools: [recordWarrantyStatus, provideSolution, escalate],
    middleware: [applyStepConfig], // [!code highlight]
    checkpointer: new MemorySaver(), // Persist state across turns  // [!code highlight]
  });
  ```
</Accordion>

### Multiple agent subgraphs

Multiple distinct agents exist as separate nodes in a graph. Handoff tools navigate between agent nodes using `Command.PARENT` to specify which node to execute next.

<Warning>
  Subgraph handoffs require careful **[context engineering](/oss/javascript/langchain/context-engineering)**. Unlike single-agent middleware (where message history flows naturally), you must explicitly decide what messages pass between agents. Get this wrong and agents receive malformed conversation history or bloated context. See [Context engineering](#context-engineering) below.
</Warning>

```typescript  theme={null}
import {
  tool,
  BaseMessage,
  ToolMessage,
  AIMessage,
  type ToolRuntime,
} from "langchain";
import { Command } from "@langchain/langgraph";
import { z } from "zod";

const stateSchema = z.object({
  messages: z.array(z.instanceof(BaseMessage)),
});

const transferToSales = tool(
  async (_, runtime: ToolRuntime<typeof stateSchema>) => {
    const lastAiMessage = runtime.state.messages // [!code highlight]
      .reverse() // [!code highlight]
      .find(AIMessage.isInstance); // [!code highlight]

    const transferMessage = new ToolMessage({ // [!code highlight]
      content: "Transferred to sales agent", // [!code highlight]
      tool_call_id: runtime.toolCallId, // [!code highlight]
    }); // [!code highlight]
    return new Command({
      goto: "sales_agent",
      update: {
        activeAgent: "sales_agent",
        messages: [lastAiMessage, transferMessage].filter(Boolean), // [!code highlight]
      },
      graph: Command.PARENT,
    });
  },
  {
    name: "transfer_to_sales",
    description: "Transfer to the sales agent.",
    schema: z.object({}),
  }
);
```

<Accordion title="Complete example: Sales and support with handoffs">
  This example shows a multi-agent system with separate sales and support agents. Each agent is a separate graph node, and handoff tools allow agents to transfer conversations to each other.

  ```typescript  theme={null}
  import {
    StateGraph,
    START,
    END,
    MessagesZodState,
    Command,
  } from "@langchain/langgraph";
  import { createAgent, AIMessage, ToolMessage } from "langchain";
  import { tool, ToolRuntime } from "@langchain/core/tools";
  import { z } from "zod/v4";

  // 1. Define state with active_agent tracker
  const MultiAgentState = MessagesZodState.extend({
    activeAgent: z.string().optional(),
  });

  // 2. Create handoff tools
  const transferToSales = tool(
    async (_, runtime: ToolRuntime<typeof MultiAgentState>) => {
      const lastAiMessage = [...runtime.state.messages] // [!code highlight]
        .reverse() // [!code highlight]
        .find(AIMessage.isInstance); // [!code highlight]
      const transferMessage = new ToolMessage({ // [!code highlight]
        content: "Transferred to sales agent from support agent", // [!code highlight]
        tool_call_id: runtime.toolCallId, // [!code highlight]
      }); // [!code highlight]
      return new Command({
        goto: "sales_agent",
        update: {
          activeAgent: "sales_agent",
          messages: [lastAiMessage, transferMessage].filter(Boolean), // [!code highlight]
        },
        graph: Command.PARENT,
      });
    },
    {
      name: "transfer_to_sales",
      description: "Transfer to the sales agent.",
      schema: z.object({}),
    }
  );

  const transferToSupport = tool(
    async (_, runtime: ToolRuntime<typeof MultiAgentState>) => {
      const lastAiMessage = [...runtime.state.messages] // [!code highlight]
        .reverse() // [!code highlight]
        .find(AIMessage.isInstance); // [!code highlight]
      const transferMessage = new ToolMessage({ // [!code highlight]
        content: "Transferred to support agent from sales agent", // [!code highlight]
        tool_call_id: runtime.toolCallId, // [!code highlight]
      }); // [!code highlight]
      return new Command({
        goto: "support_agent",
        update: {
          activeAgent: "support_agent",
          messages: [lastAiMessage, transferMessage].filter(Boolean), // [!code highlight]
        },
        graph: Command.PARENT,
      });
    },
    {
      name: "transfer_to_support",
      description: "Transfer to the support agent.",
      schema: z.object({}),
    }
  );

  // 3. Create agents with handoff tools
  const salesAgent = createAgent({
    model: "anthropic:claude-sonnet-4-20250514",
    tools: [transferToSupport],
    systemPrompt:
      "You are a sales agent. Help with sales inquiries. If asked about technical issues or support, transfer to the support agent.",
  });

  const supportAgent = createAgent({
    model: "anthropic:claude-sonnet-4-20250514",
    tools: [transferToSales],
    systemPrompt:
      "You are a support agent. Help with technical issues. If asked about pricing or purchasing, transfer to the sales agent.",
  });

  // 4. Create agent nodes that invoke the agents
  const callSalesAgent = async (
    state: z.infer<typeof MultiAgentState>
  ) => {
    const response = await salesAgent.invoke(state);
    return response;
  };

  const callSupportAgent = async (
    state: z.infer<typeof MultiAgentState>
  ) => {
    const response = await supportAgent.invoke(state);
    return response;
  };

  // 5. Create router that checks if we should end or continue
  const routeAfterAgent = (
    state: z.infer<typeof MultiAgentState>
  ): "sales_agent" | "support_agent" | "__end__" => {
    const messages = state.messages ?? [];

    // Check the last message - if it's an AIMessage without tool calls, we're done
    if (messages.length > 0) {
      const lastMsg = messages[messages.length - 1];
      if (lastMsg instanceof AIMessage && !lastMsg.tool_calls?.length) { // [!code highlight]
        return "__end__"; // [!code highlight]
      } // [!code highlight]
    }

    // Otherwise route to the active agent
    const active = state.activeAgent ?? "sales_agent";
    return active as "sales_agent" | "support_agent";
  };

  const routeInitial = (
    state: z.infer<typeof MultiAgentState>
  ): "sales_agent" | "support_agent" => {
    // Route to the active agent based on state, default to sales agent
    return (state.activeAgent ?? "sales_agent") as
      | "sales_agent"
      | "support_agent";
  };

  // 6. Build the graph
  const builder = new StateGraph(MultiAgentState)
    .addNode("sales_agent", callSalesAgent)
    .addNode("support_agent", callSupportAgent);
    // Start with conditional routing based on initial activeAgent
    .addConditionalEdges(START, routeInitial, [
      "sales_agent",
      "support_agent",
    ])
    // After each agent, check if we should end or route to another agent
    .addConditionalEdges("sales_agent", routeAfterAgent, [
      "sales_agent",
      "support_agent",
      END,
    ]);
    builder.addConditionalEdges("support_agent", routeAfterAgent, [
      "sales_agent",
      "support_agent",
      END,
    ]);

  const graph = builder.compile();
  const result = await graph.invoke({
    messages: [
      {
        role: "user",
        content: "Hi, I'm having trouble with my account login. Can you help?",
      },
    ],
  });

  for (const msg of result.messages) {
    console.log(msg.content);
  }
  ```
</Accordion>

<Tip>
  Use **single agent with middleware** for most handoffs use cases—it's simpler. Only use **multiple agent subgraphs** when you need bespoke agent implementations (e.g., a node that's itself a complex graph with reflection or retrieval steps).
</Tip>

#### Context engineering

With subgraph handoffs, you control exactly what messages flow between agents. This precision is essential for maintaining valid conversation history and avoiding context bloat that could confuse downstream agents. For more on this topic, see [context engineering](/oss/javascript/langchain/context-engineering).

**Handling context during handoffs**

When handing off between agents, you need to ensure the conversation history remains valid. LLMs expect tool calls to be paired with their responses, so when using `Command.PARENT` to hand off to another agent, you must include both:

1. **The `AIMessage` containing the tool call** (the message that triggered the handoff)
2. **A `ToolMessage` acknowledging the handoff** (the artificial response to that tool call)

Without this pairing, the receiving agent will see an incomplete conversation and may produce errors or unexpected behavior.

The example below assumes only the handoff tool was called (no parallel tool calls):

```typescript  theme={null}
const transferToSales = tool(
  async (_, runtime: ToolRuntime<typeof MultiAgentState>) => {
    // Get the AI message that triggered this handoff
    const lastAiMessage = runtime.state.messages.at(-1);

    // Create an artificial tool response to complete the pair
    const transferMessage = new ToolMessage({
      content: "Transferred to sales agent",
      tool_call_id: runtime.toolCallId,
    });

    return new Command({
      goto: "sales_agent",
      update: {
        activeAgent: "sales_agent",
        // Pass only these two messages, not the full subagent history
        messages: [lastAiMessage, transferMessage],
      },
      graph: Command.PARENT,
    });
  },
  {
    name: "transfer_to_sales",
    description: "Transfer to the sales agent.",
    schema: z.object({}),
  }
);
```

<Note>
  **Why not pass all subagent messages?** While you could include the full subagent conversation in the handoff, this often creates problems. The receiving agent may become confused by irrelevant internal reasoning, and token costs increase unnecessarily. By passing only the handoff pair, you keep the parent graph's context focused on high-level coordination. If the receiving agent needs additional context, consider summarizing the subagent's work in the ToolMessage content instead of passing raw message history.
</Note>

**Returning control to the user**

When returning control to the user (ending the agent's turn), ensure the final message is an `AIMessage`. This maintains valid conversation history and signals to the user interface that the agent has finished its work.

## Implementation considerations

As you design your multi-agent system, consider:

* **Context filtering strategy**: Will each agent receive full conversation history, filtered portions, or summaries? Different agents may need different context depending on their role.
* **Tool semantics**: Clarify whether handoff tools only update routing state or also perform side effects. For example, should `transfer_to_sales()` also create a support ticket, or should that be a separate action?
* **Token efficiency**: Balance context completeness against token costs. Summarization and selective context passing become more important as conversations grow longer.

***

<Callout icon="pen-to-square" iconType="regular">
  [Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/oss/langchain/multi-agent/handoffs.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).
</Callout>

<Tip icon="terminal" iconType="regular">
  [Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.
</Tip>

> ## Documentation Index
> Fetch the complete documentation index at: https://docs.langchain.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Subagents

In the **subagents** architecture, a central main [agent](/oss/javascript/langchain/agents) (often referred to as a **supervisor**) coordinates subagents by calling them as [tools](/oss/javascript/langchain/tools). The main agent decides which subagent to invoke, what input to provide, and how to combine results. Subagents are stateless—they don't remember past interactions, with all conversation memory maintained by the main agent. This provides [context](/oss/javascript/langchain/context-engineering) isolation: each subagent invocation works in a clean context window, preventing context bloat in the main conversation.

```mermaid  theme={null}
graph LR
    A[User] --> B[Main Agent]
    B --> C[Subagent A]
    B --> D[Subagent B]
    B --> E[Subagent C]
    C --> B
    D --> B
    E --> B
    B --> F[User response]
```

## Key characteristics

* Centralized control: All routing passes through the main agent
* No direct user interaction: Subagents return results to the main agent, not the user (though you can use [interrupts](/oss/javascript/langgraph/human-in-the-loop#interrupt) within a subagent to allow user interaction)
* Subagents via tools: Subagents are invoked via tools
* Parallel execution: The main agent can invoke multiple subagents in a single turn

<Note>
  **Supervisor vs. Router**: A supervisor agent (this pattern) is different from a [router](/oss/javascript/langchain/multi-agent/router). The supervisor is a full agent that maintains conversation context and dynamically decides which subagents to call across multiple turns. A router is typically a single classification step that dispatches to agents without maintaining ongoing conversation state.
</Note>

## When to use

Use the subagents pattern when you have multiple distinct domains (e.g., calendar, email, CRM, database), subagents don't need to converse directly with users, or you want centralized workflow control. For simpler cases with just a few [tools](/oss/javascript/langchain/tools), use a [single agent](/oss/javascript/langchain/agents).

<Tip>
  **Need user interaction within a subagent?** While subagents typically return results to the main agent rather than conversing directly with users, you can use [interrupts](/oss/javascript/langgraph/human-in-the-loop#interrupt) within a subagent to pause execution and gather user input. This is useful when a subagent needs clarification or approval before proceeding. The main agent remains the orchestrator, but the subagent can collect information from the user mid-task.
</Tip>

## Basic implementation

The core mechanism wraps a subagent as a tool that the main agent can call:

```typescript  theme={null}
import { createAgent, tool } from "langchain";
import { z } from "zod";

// Create a subagent
const subagent = createAgent({ model: "anthropic:claude-sonnet-4-20250514", tools: [...] });

// Wrap it as a tool
const callResearchAgent = tool(
  async ({ query }) => {
    const result = await subagent.invoke({
      messages: [{ role: "user", content: query }]
    });
    return result.messages.at(-1)?.content;
  },
  {
    name: "research",
    description: "Research a topic and return findings",
    schema: z.object({ query: z.string() })
  }
);

// Main agent with subagent as a tool
const mainAgent = createAgent({ model: "anthropic:claude-sonnet-4-20250514", tools: [callResearchAgent] });
```

<Card title="Tutorial: Build a personal assistant with subagents" icon="sitemap" href="/oss/javascript/langchain/multi-agent/subagents-personal-assistant" arrow cta="Learn more">
  Learn how to build a personal assistant using the subagents pattern, where a central main agent (supervisor) coordinates specialized worker agents.
</Card>

## Design decisions

When implementing the subagents pattern, you'll make several key design choices. This table summarizes the options—each is covered in detail in the sections below.

| Decision                                  | Options                                      |
| ----------------------------------------- | -------------------------------------------- |
| [**Sync vs. async**](#sync-vs-async)      | Sync (blocking) vs. async (background)       |
| [**Tool patterns**](#tool-patterns)       | Tool per agent vs. single dispatch tool      |
| [**Subagent inputs**](#subagent-inputs)   | Query only vs. full context                  |
| [**Subagent outputs**](#subagent-outputs) | Subagent result vs full conversation history |

## Sync vs. async

Subagent execution can be **synchronous** (blocking) or **asynchronous** (background). Your choice depends on whether the main agent needs the result to continue.

| Mode      | Main agent behavior                         | Best for                               | Tradeoff                            |
| --------- | ------------------------------------------- | -------------------------------------- | ----------------------------------- |
| **Sync**  | Waits for subagent to complete              | Main agent needs result to continue    | Simple, but blocks the conversation |
| **Async** | Continues while subagent runs in background | Independent tasks, user shouldn't wait | Responsive, but more complex        |

<Tip>
  Not to be confused with Python's `async`/`await`. Here, "async" means the main agent kicks off a background job (typically in a separate process or service) and continues without blocking.
</Tip>

### Synchronous (default)

By default, subagent calls are **synchronous**—the main agent waits for each subagent to complete before continuing. Use sync when the main agent's next action depends on the subagent's result.

```mermaid  theme={null}
sequenceDiagram
    participant User
    participant Main Agent
    participant Research Subagent

    User->>Main Agent: "What's the weather in Tokyo?"
    Main Agent->>Research Subagent: research("Tokyo weather")
    Note over Main Agent: Waiting for result...
    Research Subagent-->>Main Agent: "Currently 72°F, sunny"
    Main Agent-->>User: "It's 72°F and sunny in Tokyo"
```

**When to use sync:**

* Main agent needs the subagent's result to formulate its response
* Tasks have order dependencies (e.g., fetch data → analyze → respond)
* Subagent failures should block the main agent's response

**Tradeoffs:**

* Simple implementation—just call and wait
* User sees no response until all subagents complete
* Long-running tasks freeze the conversation

### Asynchronous

Use **asynchronous execution** when the subagent's work is independent—the main agent doesn't need the result to continue conversing with the user. The main agent kicks off a background job and remains responsive.

```mermaid  theme={null}
sequenceDiagram
    participant User
    participant Main Agent
    participant Job System
    participant Contract Reviewer

    User->>Main Agent: "Review this M&A contract"
    Main Agent->>Job System: run_agent("legal_reviewer", task)
    Job System->>Contract Reviewer: Start agent
    Job System-->>Main Agent: job_id: "job_123"
    Main Agent-->>User: "Started review (job_123)"

    Note over Contract Reviewer: Reviewing 150+ pages...

    User->>Main Agent: "What's the status?"
    Main Agent->>Job System: check_status(job_id)
    Job System-->>Main Agent: "running"
    Main Agent-->>User: "Still reviewing contract..."

    Note over Contract Reviewer: Review completes

    User->>Main Agent: "Is it done yet?"
    Main Agent->>Job System: check_status(job_id)
    Job System-->>Main Agent: "completed"
    Main Agent->>Job System: get_result(job_id)
    Job System-->>Main Agent: Contract analysis
    Main Agent-->>User: "Review complete: [findings]"
```

**When to use async:**

* Subagent work is independent of the main conversation flow
* Users should be able to continue chatting while work happens
* You want to run multiple independent tasks in parallel

**Three-tool pattern:**

1. **Start job**: Kicks off the background task, returns a job ID
2. **Check status**: Returns current state (pending, running, completed, failed)
3. **Get result**: Retrieves the completed result

**Handling job completion:** When a job finishes, your application needs to notify the user. One approach: surface a notification that, when clicked, sends a `HumanMessage` like "Check job\_123 and summarize the results."

## Tool patterns

There are two main ways to expose subagents as tools:

| Pattern                                           | Best for                                                      | Trade-off                                         |
| ------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------- |
| [**Tool per agent**](#tool-per-agent)             | Fine-grained control over each subagent's input/output        | More setup, but more customization                |
| [**Single dispatch tool**](#single-dispatch-tool) | Many agents, distributed teams, convention over configuration | Simpler composition, less per-agent customization |

### Tool per agent

```mermaid  theme={null}
graph LR
    A[User] --> B[Main Agent]
    B --> C[Subagent A]
    B --> D[Subagent B]
    B --> E[Subagent C]
    C --> B
    D --> B
    E --> B
    B --> F[User response]
```

The key idea is wrapping subagents as tools that the main agent can call:

```typescript  theme={null}
import { createAgent, tool } from "langchain";
import * as z from "zod";

// Create a sub-agent
const subagent = createAgent({...});  // [!code highlight]

// Wrap it as a tool  // [!code highlight]
const callSubagent = tool(  // [!code highlight]
  async ({ query }) => {  // [!code highlight]
    const result = await subagent.invoke({
      messages: [{ role: "user", content: query }]
    });
    return result.messages.at(-1)?.text;
  },
  {
    name: "subagent_name",
    description: "subagent_description",
    schema: z.object({
      query: z.string().describe("The query to send to subagent")
    })
  }
);

// Main agent with subagent as a tool  // [!code highlight]
const mainAgent = createAgent({ model, tools: [callSubagent] });  // [!code highlight]
```

The main agent invokes the subagent tool when it decides the task matches the subagent's description, receives the result, and continues orchestration. See [Context engineering](#context-engineering) for fine-grained control.

### Single dispatch tool

An alternative approach uses a single parameterized tool to invoke ephemeral sub-agents for independent tasks. Unlike the [tool per agent](#tool-per-agent) approach where each sub-agent is wrapped as a separate tool, this uses a convention-based approach with a single `task` tool: the task description is passed as a human message to the sub-agent, and the sub-agent's final message is returned as the tool result.

Use this approach when you want to distribute agent development across multiple teams, need to isolate complex tasks into separate context windows, need a scalable way to add new agents without modifying the coordinator, or prefer convention over customization. This approach trades flexibility in context engineering for simplicity in agent composition and strong context isolation.

```mermaid  theme={null}
graph LR
    A[User] --> B[Main Agent]
    B --> C{task<br/>agent_name, description}
    C -->|research| D[Research Agent]
    C -->|writer| E[Writer Agent]
    C -->|reviewer| F[Reviewer Agent]
    D --> C
    E --> C
    F --> C
    C --> B
    B --> G[User response]
```

**Key characteristics:**

* Single task tool: One parameterized tool that can invoke any registered sub-agent by name
* Convention-based invocation: Agent selected by name, task passed as human message, final message returned as tool result
* Team distribution: Different teams can develop and deploy agents independently
* Agent discovery: Sub-agents can be discovered via system prompt (listing available agents) or through [progressive disclosure](/oss/javascript/langchain/multi-agent/skills-sql-assistant) (loading agent information on-demand via tools)

<Tip>
  An interesting aspect of this approach is that sub-agents may have the exact same capabilities as the main agent. In such cases, invoking a sub-agent is **really about context isolation** as the primary reason—allowing complex, multi-step tasks to run in isolated context windows without bloating the main agent's conversation history. The sub-agent completes its work autonomously and returns only a concise summary, keeping the main thread focused and efficient.
</Tip>

<Accordion title="Agent registry with task dispatcher">
  ```typescript  theme={null}
  import { tool, createAgent } from "langchain";
  import * as z from "zod";

  // Sub-agents developed by different teams
  const researchAgent = createAgent({
    model: "gpt-4o",
    prompt: "You are a research specialist...",
  });

  const writerAgent = createAgent({
    model: "gpt-4o",
    prompt: "You are a writing specialist...",
  });

  // Registry of available sub-agents
  const SUBAGENTS = {
    research: researchAgent,
    writer: writerAgent,
  };

  const task = tool(
    async ({ agentName, description }) => {
      const agent = SUBAGENTS[agentName];
      const result = await agent.invoke({
        messages: [
          { role: "user", content: description }
        ],
      });
      return result.messages.at(-1)?.content;
    },
    {
      name: "task",
      description: `Launch an ephemeral subagent.

  Available agents:
  - research: Research and fact-finding
  - writer: Content creation and editing`,
      schema: z.object({
        agentName: z
          .string()
          .describe("Name of agent to invoke"),
        description: z
          .string()
          .describe("Task description"),
      }),
    }
  );

  // Main coordinator agent
  const mainAgent = createAgent({
    model: "gpt-4o",
    tools: [task],
    prompt: (
      "You coordinate specialized sub-agents. " +
      "Available: research (fact-finding), " +
      "writer (content creation). " +
      "Use the task tool to delegate work."
    ),
  });
  ```
</Accordion>

## Context engineering

Control how context flows between the main agent and its subagents:

| Category                                  | Purpose                                                  | Impacts                      |
| ----------------------------------------- | -------------------------------------------------------- | ---------------------------- |
| [**Subagent specs**](#subagent-specs)     | Ensure subagents are invoked when they should be         | Main agent routing decisions |
| [**Subagent inputs**](#subagent-inputs)   | Ensure subagents can execute well with optimized context | Subagent performance         |
| [**Subagent outputs**](#subagent-outputs) | Ensure the supervisor can act on subagent results        | Main agent performance       |

See also our comprehensive guide on [context engineering](/oss/javascript/langchain/context-engineering) for agents.

### Subagent specs

The **names** and **descriptions** associated with subagents are the primary way the main agent knows which subagents to invoke.
These are prompting levers—choose them carefully.

* **Name**: How the main agent refers to the sub-agent. Keep it clear and action-oriented (e.g., `research_agent`, `code_reviewer`).
* **Description**: What the main agent knows about the sub-agent's capabilities. Be specific about what tasks it handles and when to use it.

For the [single dispatch tool](#single-dispatch-tool) design, the main agent needs to call the `task` tool with the name of the subagent to invoke. The available tools can be provided to the main agent via one of the following methods:

* **System prompt enumeration**: List available agents in the system prompt.
* **Enum constraint on dispatch tool**: For small agent lists, add an enum to the `agent_name` field.
* **Tool-based discovery**: For large or dynamic agent registries, provide a separate tool (e.g., `list_agents` or `search_agents`) that returns available agents.

### Subagent inputs

Customize what context the subagent receives to execute its task. Add input that isn't practical to capture in a static prompt—full message history, prior results, or task metadata—by pulling from the agent's state.

```typescript Subagent inputs example expandable theme={null}
import { createAgent, tool, AgentState, ToolMessage } from "langchain";
import { Command } from "@langchain/langgraph";
import * as z from "zod";

// Example of passing the full conversation history to the sub agent via the state.
const callSubagent1 = tool(
  async ({query}) => {
    const state = getCurrentTaskInput<AgentState>();
    // Apply any logic needed to transform the messages into a suitable input
    const subAgentInput = someLogic(query, state.messages);
    const result = await subagent1.invoke({
      messages: subAgentInput,
      // You could also pass other state keys here as needed.
      // Make sure to define these in both the main and subagent's
      // state schemas.
      exampleStateKey: state.exampleStateKey
    });
    return result.messages.at(-1)?.content;
  },
  {
    name: "subagent1_name",
    description: "subagent1_description",
  }
);
```

### Subagent outputs

Customize what the main agent receives back so it can make good decisions. Two strategies:

1. **Prompt the sub-agent**: Specify exactly what should be returned. A common failure mode is that the sub-agent performs tool calls or reasoning but doesn't include results in its final message—remind it that the supervisor only sees the final output.
2. **Format in code**: Adjust or enrich the response before returning it. For example, pass specific state keys back in addition to the final text using a [`Command`](/oss/javascript/langgraph/graph-api#command).

```typescript Subagent outputs example expandable theme={null}
import { tool, ToolMessage } from "langchain";
import { Command } from "@langchain/langgraph";
import * as z from "zod";

const callSubagent1 = tool(
  async ({ query }, config) => {
    const result = await subagent1.invoke({
      messages: [{ role: "user", content: query }]
    });

    // Return a Command to update multiple state keys
    return new Command({
      update: {
        // Pass back additional state from the subagent
        exampleStateKey: result.exampleStateKey,
        messages: [
          new ToolMessage({
            content: result.messages.at(-1)?.text,
            tool_call_id: config.toolCall?.id!
          })
        ]
      }
    });
  },
  {
    name: "subagent1_name",
    description: "subagent1_description",
    schema: z.object({
      query: z.string().describe("The query to send to subagent1")
    })
  }
);
```

***

<Callout icon="pen-to-square" iconType="regular">
  [Edit this page on GitHub](https://github.com/langchain-ai/docs/edit/main/src/oss/langchain/multi-agent/subagents.mdx) or [file an issue](https://github.com/langchain-ai/docs/issues/new/choose).
</Callout>

<Tip icon="terminal" iconType="regular">
  [Connect these docs](/use-these-docs) to Claude, VSCode, and more via MCP for real-time answers.
</Tip>
