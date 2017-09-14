# OpenMined.org

## Getting Started
- Make sure you have NPM (https://www.npmjs.com/) and SASS (http://sass-lang.com/guide) installed.
- Run `npm install` to install all the dependencies.
- Run `gulp` to run the SASS compiler, which will watch all `.scss` files in the root directory for changes and compile them as you save.
- Open `index.html` in your browser.

## Contributing
Create an issue first and discuss all changes publicly.  Follow a standard pull request model for version control.

## Deploy
To deploy, run `gulp deploy`.  Note that you'll need to have a file in the root directory named `awsaccess.json`.  This is deliberately ignored on Github and **should never be uploaded**.  If you need deployment keys, contact @cereallarceny on the matter.

## Running the site

- Go to Openmined site backend folder `cd openminedsite`
- install dependencies using `pip install -r requirements.txt`
- Collect the static files by running 'python manage.py collectstatic'
- Run the server using ip:port 'python manage.py runserver 0.0.0.0:9000' 
- Site can be accessed at the url http://ip:port/openmined/index/ (to access on local replace ip with "localhost")