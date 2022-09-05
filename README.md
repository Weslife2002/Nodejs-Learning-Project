# LikedIn Jobs Recruitment Crawling Automation

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#workflow">Workflow</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

I created this one to save LikedIn jobs into database for later use like jobs analysis, etc. Moreover, I want to schedule the process so that it will automatically run at specific time daily. So that it will crawl all the jobs data available at that specific days finally send the data file to the server.

<p align="right">(<a href="#top">back to top</a>)</p>

### Workflow

This section should list the workflow of the project.

* Crawling the data and save it into database
* Encript the database file
* Send it to server through SFTP

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

This section should list any major frameworks/tools/languages to schedule and automate this process.

* Docker
* GPG encryption (Bash Programming)
* SFTP (Bash Programming)
* Selenium (Python)
* Flask (Python)
* Airflow (Python)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.

### Prerequisites

Since we will use docker-compose to get Airflow up and running, we have to install Docker first. 
Simply headover to <a href="https://docs.docker.com/desktop/install/mac-install/"> Docker Desktop Installation site </a> to download Docker Desktop and <a href="https://docs.docker.com/engine/install/ubuntu/"> Docker Engine Installation Tutorial site </a> to download Docker Engine.

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Get a free API Key at [https://example.com](https://example.com)
2. Clone the repo
   ```sh
   git clone https://github.com/your_username_/Project-Name.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Enter your API in `config.js`
   ```js
   const API_KEY = 'ENTER YOUR API';
   ```

<p align="right">(<a href="#top">back to top</a>)</p>
