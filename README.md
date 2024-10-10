# Wanderlust
<<<<<<< HEAD
=======

Wanderlust is a web application designed to help users explore and book various types of listings. It features a variety of categories including rooms, mountains, castles, pools, beaches, and cities. Users can view detailed information about each listing, read reviews, and filter listings based on their preferences.

## Features

- **Explore Listings**: Browse listings by category, including trending, rooms, mountains, castles, pools, beachside, and top cities.
- **Detailed Listings**: View detailed information about each listing, including images, descriptions, and prices.
- **User Reviews**: Read and leave reviews for each listing.
- **Geocoding Integration**: Uses Mapbox to provide location-based services.
- **Image Storage**: Utilizes Cloudinary for managing listing images.

## Installation

1. **Clone the Repository**

    ```bash
    git clone https://github.com/ritishmodgil25/Wanderlust.git
    ```

2. **Navigate to the Project Directory**

    ```bash
    cd Wanderlust
    ```

3. **Install Dependencies**

    Ensure you have [Node.js](https://nodejs.org/) installed. Then run:

    ```bash
    npm install
    ```

4. **Set Up Environment Variables**

    Create a `.env` file in the root of the project and add the following variables:

    ```env
    CLOUD_NAME=your_cloud_name
    CLOUD_API_KEY=your_cloud_api_key
    CLOUD_API_SECRET=your_cloud_api_secret
    MAP_TOKEN=your_mapbox_token
    ATLASDB_URL=your_mongodb_connection_string
    ```

5. **Run the Application**

    ```bash
    npm start
    ```

    The application will start on [http://localhost:3000](http://localhost:3000) by default.
   

## Acknowledgements

- **Mapbox**: For geocoding services.
- **Cloudinary**: For image management.
- **Bootstrap**: For styling.

>>>>>>> 2bc4c051aae0dfe37dc2f8a2b1d464e60e5fd696
