const express = require('express');
const promClient = require('prom-client');
const logger = require('log4js').getLogger();

const app = express();
const metrics = new promClient.Registry();
promClient.collectDefaultMetrics({ register: metrics });

// Enable logging
logger.level = 'info';

app.get('/', (req, res) => {
  logger.info('Hello endpoint called');
  res.json({ message: 'Hello, World!' });
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
  

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
