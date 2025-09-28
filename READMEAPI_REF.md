Please check the tests file for all thunderclient API endpoint testing. The title of each file indicates which endpoint was tested and
the resulting .json file was the response from the server from the Thunderclient extension. 

My additions to the API were as follows:

I have included an appointment information Mongoose Schemma and four endpoints, one for creating appointments
router.post('/appointments', createAppointment);
one for updating appointments
router.put('/appointments/:id', updateAppointment); 
one for deleting appointments
router.delete('/appointments/:id', deleteAppointment);
and one for getting all appointments
router.get('/appointments', getAllAppointments);

Delete and update appointments requires an id for the appointment. There is a simple data validation code segment that simply checks to see if the user has
provided an id. Seeing as the data structure is not very offical as of the time being, more advanced data validation may not be accurate to the final product.

Creating an appointment requires several fields. The payload passed to the api can be seen under "appointments" in the responding .json file. 

The server and app are seperated into two different .js files, to persuade the developer to load all server config information into config files and 
manage everything properly in the app.js file. 

The controller contains all function bodies for responding to API requests. 

While I believe that the .env and .env.example files will not be shared with you, please trust that they are present and are used to configure the 
server. 

I have also left much of your example data in the final deliverable. I am afraid if I touch something I will break it. I hope this is not a problem. 

-Riz. 