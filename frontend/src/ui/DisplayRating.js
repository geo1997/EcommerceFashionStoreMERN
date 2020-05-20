import React, {useEffect,useState} from 'react'
import StarRatingComponent from 'react-star-rating-component';
import {API} from "../Config";

function DisplayRating(props) {

    const [allRatings, setRatings] = useState([]);

    const ids = [props.pID]

     const getRatings = () =>{
        return fetch(`${API}/rating/getAll`,{
            method: "GET"
        })
            .then(response =>{
                return response.json();
            })
            .catch(err=> console.log(err));
    }

    const loadRatings = () =>{
         getRatings().then(content => {
             if(content.error){
                 console.log("error");
             }else{
                 setRatings(content);
             }
         })
    }

    useEffect(() => {
        loadRatings();
        console.log('prop',props.pID)
    },[])


    return(

        ids.map((pid, index) =>(
                <div>

                    {allRatings.map((ratings, index ) => (
                        <div key={index}>
                            <StarRatingComponent
                                name="rate1"
                                starCount={5}
                                size="10"
                                value={ratings.avg}
                                className="mr-5"
                                pid={ratings._id}

                            />
                        </div>
                    ))}
                </div>
        ))


    )





};

export default DisplayRating