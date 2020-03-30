This project is for editing notes interactively online, collaboratively.

I have implemented a simple mock front end, as well as a functioning back end.

I have yet to make sure they work together, and also implement sharing that upates by itself.

In regards to the project file structure:
-Client:
In the components folder we have the components, grouped by functionality (i.e. sidebar has its own folder). There's a file "atoms" that contains small atomic components, that are reusable.
More importantly, in the contexts folder we have two contexts - one for auth and one for notes.
In the scss folder we have all the styling.
Pages folder contains the pages.

-Functions
These are the firebase cloud functions. The heart of this lies in the handles folder. Here lies the functions that are connected to their respective endpoint in the index file.
In the middleware folder is currently only the auth-middleware, that requires users to be authenticated to make changes and read data. 
Lastly, in the util folder is small utility functions, as well as the firebase setup.
