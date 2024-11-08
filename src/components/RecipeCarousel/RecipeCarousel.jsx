
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import styles from './RecipeCarousel.module.css';
import React, { useState } from "react";




function RecipeCarousel({ recipes }) {

    const [visible, setVisible] = useState(Array(recipes.length).fill(false));  // Create an array to track visibility for each slide

    const toggleOverlay = (index) => {
        const newVisible = [...visible];  // Copy current visibility array
        newVisible[index] = !newVisible[index];  // Toggle visibility for the clicked item
        setVisible(newVisible);  // Update the state
    };


    const settings = {
        dots: true,
        infinite: true,
        speed: 900,
        slidesToShow: 4,
        slidesToScroll: 4
      };

    return (
     <div className="carousel-container">
         <Slider {...settings}>
         {recipes.map((recipe, index) => (
                    <div key={index} className="border-black" onClick={() => toggleOverlay(index)}>
                <div className="text-xl text-center text-white bg-black bg-opacity-60 p-3 w-full">{recipe.name}</div>
                <div className="relative w-full h-full">
                            <img src={recipe.image} alt={recipe.name} style={{ width: '100%', height: '300px', objectFit: 'cover' ,border: '2px solid black', borderRadius: '10px' }} />
                            {visible[index] && (
                            <div className="activate info-overlay absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-3">
                                <p className="text-sm text-left mb-2"><span class="text-base">Ingredients:</span> {recipe.ingredients.join(', ')}</p>
                                <p className="text-sm text-left"><span class="text-base">Directions:</span> {recipe.directions}</p>
                            </div> 
                            )}
                        </div>
                    </div>
                ))}
        </Slider>
      </div>
    );
}

export default RecipeCarousel;



