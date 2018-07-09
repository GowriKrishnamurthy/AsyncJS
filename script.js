     /* Asynchronous JS Sample 1: simulation using setTimeout() 
        const second = () => 
            setTimeout(() => {
                document.writeln('Second <br>');
            }, 2000);
            const first = () => {
                document.writeln('Hey there! <br>');
                second();
                document.writeln('The End. <br>');
            }
            first();
            */

        // Asynchronous JS Sample 2: using callbacks 
        // Assume we are fetching recipeId and recipe details based on that iD from database.
        // Simulating wait to get DB transactions done using setTimeout() 
        // Callback inside callbacks --> Callback hell.

        /*
        function getRecipe() {
            setTimeout(() => {
                const recipeID = [523, 883, 432, 974];
                console.log(recipeID);
                
                // Get recipe details for id=432 from database
                setTimeout(id => {
                    const recipe = { title: 'Cheezy Pasta', publisher: 'Gowri' };
                    console.log(`${id}: ${recipe.title}`);
                    setTimeout(publisher => {
                        const recipe2 = { title: 'Veg Pizza', publisher: 'Gowri' };
                        console.log(recipe2);
                    }, 1500, recipe.publisher);
                }, 1500, recipeID[2]);
            }, 1500);
        }
        getRecipe();
        
        // Asynchronous JS Sample 3: using Promise 
        // STEP1: CONSTRUCTING ALL THE PROMISES
        // resolve function- if event handling was successful 
        // reject - if any failure
        const getIDs = new Promise((resolve, reject) => {
            setTimeout(() => {
                const recipeID = [523, 883, 432, 974];
                // Handling resolve function as we know the Settimeout wont fail here
                resolve(recipeID);
                // reject(recipeID);
            }, 1500);
        });

        // Get the reciepe details for a particular ID 
        // into this getRecipeById() function we pass in recID, so the recipe ID  which then passed into setTimeout()
        // it becomes ID which is then used inside the call back function.
        const getRecipeById = recID => {
            return new Promise((resolve, reject) => {
                setTimeout(ID => {
                    const recipe = { title: 'Cheezy Pasta', publisher: 'Gowri' }; 
                    resolve(`${ID}: ${recipe.title}`);
                }, 1500, recID);
            });
        };
        
        const getRecipeByPublisher = publisher => {
            return new Promise((resolve, reject) => {
                setTimeout(pub => {
                    const recipeByPublisher = { title: 'Veg Pizza', publisher: 'Gowri' };
                    resolve(`${pub}: ${recipeByPublisher.title}`);
                }, 1500, publisher);
            });
        };

        // STEP2: CONSUMING THE PROMISES USING CHAINS OF THEN
        // then function on the Promise object- to handle the fulfilled Promise
        // argument to then - result of the successful Promise is consumed
        
        getIDs
            .then(IDs => {
                console.log(IDs);
                return getRecipeById(IDs[2]);
            })
            .then(recipeById=>{
                console.log(recipeById);
                return getRecipeByPublisher(recipeById.publisher);
            })
            .then(recipeByPublisher=>{
                console.log(recipeByPublisher);
            })
            .catch(error => {
                console.log('Error!!');
            }); 
        
        // Asynchronous JS Sample 4 
        // STEP2: CONSUMING PROMISES USING ASYNC/AWAIT instead of chains of Thens
        async function getRecipesAW(){
            const IDs = await getIDs;
            const recipebyId=await getRecipeById(IDs[2]);
            console.log("Recipes by Id: " + recipebyId);

            const recipeByPublisher= await getRecipeByPublisher('Gowri');
            console.log("Recipes by Publisher: " +recipeByPublisher);
            return recipeByPublisher;
        }
        // async method runs in the background and always returns a Promise
        getRecipesAW().then(res=>console.log(res));
  */
        // Asynchronous JS Sample 5: Making AJAX calls with Fetch and Promise
        //woeId- Where On Earth ID.
        function getWeather(woeid) {
            fetch(`https://www.metaweather.com/api/location/${woeid}/`)
                .then(result => {
                    console.log(result);
                    // Process this promise response with JSON so that we can then get the actual result
                    return result.json();
                })
                .then(data => {
                    // Display the data we returned from the Promise
                    console.log(data);
                    const today = data.consolidated_weather[0];
                    console.log(`Temperatures today in ${data.title} stay between ${Math.round(today.min_temp)} and ${Math.round(today.max_temp)}. ${today.weather_state_name} expected`);
                })
                .catch(error => console.log(error));
        }
        //woeid for Melbourne - 1103816
        //getWeather(1103816); 

        // Asynchronous JS Sample 6: Making AJAX calls with Fetch and ASync/await
        //woeId- Where On Earth ID.
        async function getWeatherAW(woeid) {
            try {
                const result = await fetch(`https://www.metaweather.com/api/location/${woeid}/`);
                console.log(result);

                // Process this promise response with JSON so that we can then get the actual result
                const data = await result.json();

                // Display the data we returned from the Promise
                console.log(data);
                const tomorrow = data.consolidated_weather[1];
                console.log(`Temperatures tomorrow in ${data.title} stay between ${Math.round(tomorrow.min_temp)} and ${Math.round(tomorrow.max_temp)}`);
                console.log(`${tomorrow.weather_state_name} expected`);
            }
            catch (error) {
                console.log(error);
            }
        }
        //woeid for Melbourne - 1103816
        getWeatherAW(1103816);
/*
        let dataLondon;
        getWeatherAW(44418).then(data => {
            dataLondon = data
            console.log(dataLondon);
        });
        */