# SimpleECS
A JavaScript ECS library that prioritizes ease of use, written because I found the ECS library I was using to be complex.

Instead of having classes and components, almost the entire program is a single JS object.
This object uses maps to store data, and has getter and setter functions to keep the experience as simple as can be.

You aren't meant to interact with any of the world's variables directly: instead, use the getter and setter methods to interact
with your entities.

## Documentation for the library

* World
  * The supreme data structure that represents the entire ECS.
  
