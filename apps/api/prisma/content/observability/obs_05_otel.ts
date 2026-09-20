export const obs_05_otel = {
  OPENTELEMETRY: {
    title: 'OpenTelemetry',
    description: 'The industry standard for generating, collecting, and exporting telemetry data without vendor lock-in.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 60,
    prerequisites: ['Metrics & Instrumentation', 'Distributed Tracing'],
    learningContent: `
# OpenTelemetry (OTel)

Historically, if you wanted to use Datadog, you had to install the Datadog SDK in your code. If you later wanted to switch to New Relic or Honeycomb, you had to rewrite all your code to use their proprietary SDKs.

**OpenTelemetry (OTel)** is an open-source standard (CNCF project) that solves this. It provides a single set of APIs, SDKs, and tooling to instrument, generate, collect, and export telemetry data (metrics, logs, and traces).

## The OpenTelemetry Architecture

### 1. The OTel API & SDK (In your application)
- You instrument your code using the open-source OTel API.
- You never import proprietary vendor code into your business logic.
- **Auto-Instrumentation:** OTel provides agents (e.g., a Java Agent or Python wrapper) that automatically hook into popular libraries (Express, Postgres, Redis, HTTP) and generate spans for you without writing a single line of manual tracing code.

### 2. The OTel Collector (In your infrastructure)
Instead of your application sending telemetry directly to Datadog over the internet, your application sends it to an **OTel Collector** running locally (usually as a DaemonSet or Sidecar in Kubernetes).
The Collector has three parts:
- **Receivers:** Accepts data from your app (via OTLP - OpenTelemetry Protocol, Jaeger, or Prometheus formats).
- **Processors:** Batches, filters, and scrubs the data (e.g., removing PII, adding Kubernetes pod metadata, tail-based sampling).
- **Exporters:** Translates the OTel data into proprietary formats and sends it to your vendors (e.g., send Traces to Honeycomb, Metrics to Prometheus, and Logs to Splunk).

## Why Use It?
Vendor neutrality. If Datadog gets too expensive, you simply change the Exporter configuration in your OTel Collector to point to Grafana Cloud. No application code needs to be recompiled or redeployed.
`,
    fullNotes: `
# Detailed Notes: OTel

- **OTLP (OpenTelemetry Protocol):** The native protocol used by OTel components to communicate. It is highly optimized, using gRPC and Protocol Buffers to efficiently stream massive amounts of telemetry data.
- **Context API:** OTel has a unified Context API that handles propagating not just tracing SpanIDs, but also Baggage and Metric labels down the execution stack seamlessly.
`,
    shortNotes: `
- OpenTelemetry is an open standard for Logs, Metrics, and Traces.
- It prevents Vendor Lock-in (write instrumentation once, export anywhere).
- Auto-instrumentation hooks into HTTP/DB drivers automatically without code changes.
- The OTel Collector sits between your app and the vendor.
- Collector Pipeline: Receiver (gets data) -> Processor (cleans/batches data) -> Exporter (sends to vendor).
- OTLP is the highly efficient gRPC protocol OTel uses under the hood.
`,
    cheatSheet: `
### OTel Collector Config Example
\`\`\`yaml
receivers:
  otlp:
    protocols: { grpc: {}, http: {} }
processors:
  batch: {} # Batch data to save network calls
exporters:
  prometheus:
    endpoint: "0.0.0.0:8889"
  datadog:
    api_key: "\${DD_API_KEY}"
service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [datadog]
\`\`\`
`,
    interviewQuestions: [
      { question: 'What is the primary architectural advantage of using the OpenTelemetry Collector?', answerHint: 'The primary advantage is vendor neutrality and decoupled architecture. By sending telemetry from the application to a local OTel Collector, you offload the processing (batching, PII scrubbing, tagging) from the application thread. More importantly, the Collector translates the data into vendor-specific formats via Exporters. This means you can switch observability vendors (e.g., from Datadog to New Relic) entirely via infrastructure configuration, requiring zero changes to the application source code.', type: 'CONCEPTUAL' }
    ],
    resources: [
      { title: 'OpenTelemetry Official Documentation', url: 'https://opentelemetry.io/docs/', type: 'ARTICLE', priority: 'S', source: 'CNCF', isOfficial: true }
    ]
  }
};
