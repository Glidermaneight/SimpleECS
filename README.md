# SimpleECS
A JavaScript ECS library that prioritizes ease of use, written because I found the ECS library I was using to be complex.

Instead of having classes and components, almost the entire program is a single JS object.
This object uses maps to store data, and has getter and setter functions to keep the experience as simple as can be.

You aren't meant to interact with any of the world's instance variables directly: instead, use the getter and setter methods to interact with your entities and components. I'll tell you the instance variables, anyway.

## Documentation for the library

* **World**
  * The supreme data structure that represents the entire ECS. Its constructor is the World() function.
  * **Instance variables**
    * archetypes: A map data structure, for storing entities of similar kinds. For example, you might have a "circle" archetype for tables, or soccer balls or basketballs and a "square" archetype for houses or counters or boxes. This is for efficiency, so that as you amass data, searches don't take as long. The user isn't meant to modify this variable outside of a method that uses it.
    * systems: Another map, that instead keys strings to functions. This map represents every system in the ECS. . The user isn't meant to modify this variable outside of a method that uses it.
    * nextEntityId: A number that is incremented each time a new entity is added. The user isn't meant to interact with this variable.
    * entitiesById: A map that maps entities to integers, like so: Map(id: entity). The user isn't meant to modify this variable outside of a method that uses it.
    * entitiesByName: A map that maps strings that represent meaningful names to entities, like so: Map(string: entity). The user isn't meant to modify this variable outside of a method that uses it.
    * running: A boolean that represents whether or not the game(or scene, or whatever the ECS is being used for) should end or not.
    * frameId: A variable that stores the result of the requestAnimationFrame() being called by the world's methods, so that the game loop can start and end as needed. The user isn't meant to interact with this variable.
    * fps: A variable that represents the FPS of the program. The user isn't meant to modify this variable.
  * **Methods**
    * AddSystem: Adds a system to the world.
    * AddArchetype: Adds an archetype to the world.
    * AddEntity: Adds an entity to the specified archetype, as well as entitiesById and entitiesByName, with the specified component data.
    * AddComponent: Adds the specified component data to the specified entity to the specified archetype, with the specified name.
    * GetArchetypes: Gets all archetypes in the ECS.
    * GetArchetype: Gets a singular, specified archetype.
    * GetFPS: Gets the FPS of the program.
    * GetEntities: Gets all entities in the specified archetype.
    * GetEntity: Gets the single entity that was specified by name.
    * GetComponents: Gets all components associated with a single entity.
    * GetComponent: Gets a single component associated with a single entity.
    * GetSystems: Gets every system associated with the world.
    * GetSystem: Gets a single system, specified by name.
    * GetRunning: Returns true or false, depending on if the ECS is running or not.
    * GetNextEntityById: Returns nextEntityById.
    * GetEntitiesById: Returns entitiesById.
    * GetEntitiesByName: Returns entitiesByName.
    * RemoveArchetype: Removes an archetype from the world.
    * RemoveComponent: Removes a single component from the specified entity.
    * RemoveEntity: Removes an entity by name.
    * RemoveSystem: Removes a system by name.
    * SetRunning: Changes the running variable to be either true or false.
* **Functions**
 * Start: Starts the game/scene, calls all systems in a for loop, and records the FPS. The "FPS" argument of this function takes a boolean. It's a toggle that prints out the FPS if true, for the purpose of debugging.
 * Cleanup: Acts as a destructor for the world object. Clears all of the data associated with the world.
