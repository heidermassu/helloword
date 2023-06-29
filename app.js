const express = require('express');
const promClient = require('prom-client');
const logger = require('log4js').getLogger();

const app = express();
const metrics = new promClient.Registry();
promClient.collectDefaultMetrics({ register: metrics });

// Enable logging
logger.level = 'info';

// Create a counter for tracking status codes
const statusCodeCounter = new promClient.Counter({
  name: 'http_status_code_total',
  help: 'Total count of HTTP status codes',
  labelNames: ['status'],
  registers: [metrics],
});

// Create a gauge for alertmanager_notifications_total metric
const alertNotificationsGauge = new promClient.Gauge({
  name: 'alertmanager_notifications_total',
  help: 'Total count of alert manager notifications',
  registers: [metrics],
});

app.get('/', (req, res) => {
  logger.info('Hello endpoint called');
  res.json({ message: 'Hello, World!' });

  // Increment the status code counter
  statusCodeCounter.labels('200').inc();
});

app.get('/metrics', (req, res) => {
  res.set('Content-Type', metrics.contentType);
  metrics.metrics().then((metricsData) => {
    res.end(metricsData);
  }).catch((error) => {
    logger.error(`Failed to retrieve metrics: ${error}`);
    res.status(500).json({ error: 'Failed to retrieve metrics' });
  });
});

// Handle wrong sub-URLs
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });

  // Increment the status code counter for 404 (Not Found)
  statusCodeCounter.labels('404').inc();
});

// Simulate alertmanager_notifications_total metric increment
setInterval(() => {
  alertNotificationsGauge.inc();
}, 5000); // Increment the metric every 5 seconds

const port = 2000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
