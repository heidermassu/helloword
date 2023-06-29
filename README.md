To run locally this lab you are going to need Grafana, Prometheus and a simple App configured with log4js
To configure Prometheus and Grafana, follow these steps:

### Prometheus Setup:
- Download Prometheus from the official Prometheus website: https://prometheus.io/download/ 
- Extract the downloaded archive to a directory of your choice.
- Navigate to the Prometheus directory in your terminal.
- Create a configuration file called prometheus.yml and open it in a text editor.
- Add the following configuration to the file:
        ´# my global config
        global:
        scrape_interval: 15s # Set the scrape interval to every 15 seconds. Default is every 1 minute.
        evaluation_interval: 15s # Evaluate rules every 15 seconds. The default is every 1 minute.
        # scrape_timeout is set to the global default (10s).

        # Alertmanager configuration
        alerting:
        alertmanagers:
            - static_configs:
                - targets:
                - alertmanager:9093

        # Load rules once and periodically evaluate them according to the global 'evaluation_interval'.
        rule_files:
        # - "first_rules.yml"
        # - "second_rules.yml"

        # A scrape configuration containing exactly one endpoint to scrape:
        # Here it's Prometheus itself.
        scrape_configs:
        # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
        - job_name: "prometheus"

            # metrics_path defaults to '/metrics'
            # scheme defaults to 'http'.

            static_configs:
            - targets: ["localhost:2000"] ´
- In this configuration, we define a scrape job for your application, specifying the address and port where your application is running. Adjust the target accordingly.
- Save the prometheus.yml file.
- Start Prometheus by running the following command in the Prometheus directory:
    ´./prometheus´
- Prometheus will start and begin scraping metrics from your application.

### Grafana Setup:
- Download Grafana from the official Grafana website: https://grafana.com/grafana/download 
- Install Grafana according to your operating system.
- Once Grafana is installed, open your web browser and access the Grafana interface by visiting http://localhost:3000 
- Log in using the default credentials (username: admin, password: admin).
- Upon logging in, you'll be prompted to set a new password.
- After setting a new password, you'll be directed to the Grafana home page.
- Click on the "Configuration" gear icon on the left sidebar, then select "Data Sources".
- Click on "Add data source" and select "Prometheus" from the available options.
- In the "HTTP" section, set the URL to http://localhost:9090 (the default Prometheus address and port).
- Scroll down and click "Save & Test" to verify the connection to Prometheus.
- Next, you can create dashboards in Grafana to visualize your metrics. Click on the "+" icon on the left sidebar and select "Dashboard" to create a new dashboard.
- Configure the dashboard panels to display the desired metrics from Prometheus.
- Explore Grafana's options and features to customize your dashboards according to your needs.
- Save and share your dashboards with team members for collaborative observability.

With Prometheus and Grafana set up and connected, you should be able to view and analyze the metrics collected from your application. Experiment with different dashboards, panels, and visualization options in Grafana to gain insights into the performance and health of your application. 
App using log4js

Log4js is a popular logging library for JavaScript applications and is commonly used in a variety of applications for generating and managing log messages. It is suitable for local development, debugging, and production environments where logging is crucial for monitoring application behaviour and troubleshooting issues. It allows developers to generate logs in various formats and send them to different output destinations. Log4js follows the logging levels hierarchy, allowing developers to control the verbosity of logs based on their severity.
Defines several logging levels, such as TRACE, DEBUG, INFO, WARN, ERROR, and FATAL. Developers can choose an appropriate level for their log statements based on the importance and severity of the logged events. By configuring the logging level, it becomes possible to control which log messages are recorded and displayed.
It's important to note that Log4js is just one of many logging libraries available for JavaScript applications. Depending on the specific requirements and preferences, developers may choose other logging frameworks or libraries such as Winston or Bunyan

Log4js is primarily designed for use with JavaScript and Node.js applications. It is specifically built for the JavaScript ecosystem and provides a convenient and feature-rich logging solution for JavaScript-based projects.

You can use Log4js with any JavaScript framework or library, including Node.js, Express.js, React.js, Angular, and others. It is compatible with both server-side and client-side JavaScript applications.
Given that in case you do not have any application is possible to use that one!

It is a simple helloword which is configured with log4js and will be helpful to generate the necessary logs to test Prometheus and Grafana in your local environment.

