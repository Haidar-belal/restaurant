# Restaurant Food Showcase

Restaurant Food Showcase is a web application designed to display food items, categories, tags, and ingredients for your restaurant.

## Installation

1. Clone the repository: `git clone https://github.com/Haidar-belal/restaurant.git`
2. Navigate to the project directory: `cd restaurant`
3. Install dependencies: `npm install`

## Usage

1. Open `config.json` in the config folder.
2. Update the `development` object with your database configuration:
   
   ```json
   "development": {
     "username": "your_db_username",
     "password": "your_db_password",
     "database": "your_db_name",
     "host": "127.0.0.1",
     "dialect": "mysql"
   }
3. Rename `.env.example` to `.env` and configure environment variables if necessary.
4. Run the project: `npm start`
5. Access the application through a web browser at `http://localhost:3000`

## Questions

For any inquiries about this project, feel free to contact us via email at `haidarabelal@gmail.com`.

## Contributing

If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Create a pull request.
