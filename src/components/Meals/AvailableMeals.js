import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setloading] = useState(false);
  const [henderror, sethenderror] = useState();

  useEffect(() => {
    setloading(true);
    const fetchMeals = async () => {
      const response = await fetch(
        "https://react-http-869a3-default-rtdb.firebaseio.com/Meals.json"
      );
      if (!response.ok) {
        throw new Error("somesting went wrong!");
      }
      const responseData = await response.json();
      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }

      setMeals(loadedMeals);
      setloading(false);
    };

    fetchMeals().catch((error) => {
      setloading(false)
      sethenderror(error.message);
    });
  }, []);

  if (loading) {
    return (
      <h1 style={{ color: "white", textAlign: "center" }}>Loading.....</h1>
    );
  }

  if (henderror) {
    return (
      <h1 style={{color:'red',textAlign:'center'}}>{henderror}</h1>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
