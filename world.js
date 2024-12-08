function World() {
    return {
        archetypes: new Map(), // Map to store archetypes
        systems: new Map(),
        nextEntityId: 0, // To uniquely identify entities
        entitiesById: new Map(), // Store entities by their unique ID for quick access
        entitiesByName: new Map(), // Store entities by their name for user-friendly access
        running: true,
        frameId: null,
        fps: 0,
        // Add a system to the world
        AddSystem: function(CallBackName, CallBack) {
            this.systems.set(CallBackName, CallBack);
        },

        // Add a new archetype (group of components)
        AddArchetype: function(ArchetypeName) {
            if (!this.archetypes.has(ArchetypeName)) {
                this.archetypes.set(ArchetypeName, new Map());
            }
        },

        // Add an entity with a name and components
        AddEntity: function(entityName, ArchetypeName, components) {
            // Check if entity name is already taken
            if (this.entitiesByName.has(entityName)) {
                throw new Error(`Entity name "${entityName}" already exists.`);
            }

            const entityId = this.nextEntityId++;
            const entity = {
                id: entityId,
                name: entityName,
                components: new Map(Object.entries(components))
            };

            // Add entity to the archetype
            if (!this.archetypes.has(ArchetypeName)) {
                this.AddArchetype(ArchetypeName);
            }
            this.archetypes.get(ArchetypeName).set(entityId, entity);

            // Store entity by its unique ID for quick access
            this.entitiesById.set(entityId, entity);

            // Store entity by its name for user-friendly access
            this.entitiesByName.set(entityName, entity);
        },

        // Add a component to an entity
        AddComponent: function(ArchetypeName, entityName, componentName, component) {
            const entity = this.entitiesByName.get(entityName);
            if (entity) {
                entity.components.set(componentName, component);
            } else {
                throw new Error(`Entity with name "${entityName}" not found.`);
            }
        },

        // Get all archetypes
        GetArchetypes: function() {
            return this.archetypes;
        },

        // Get a specific archetype by name
        GetArchetype: function(ArchetypeName) {
            return this.archetypes.get(ArchetypeName);
        },

        GetFPS(){
            return this.fps;
        },

                // Get all entities of a specific archetype
        GetEntities: function(ArchetypeName) {
            return Array.from(this.archetypes.get(ArchetypeName)?.values() || []);
        },

        // Get a specific entity by name
        GetEntity: function(entityName) {
            return this.entitiesByName.get(entityName);
        },

        // Get all components of a specific entity by name
        GetComponents: function(entityName) {
            const entity = this.entitiesByName.get(entityName);
            return entity ? entity.components : null;
        },

        // Get a specific component of a specific entity by name
        GetComponent: function(entityName, componentName) {
            const entity = this.entitiesByName.get(entityName);
            return entity ? entity.components.get(componentName) : null;
        },

        // Get all systems
        GetSystems: function() {
            return this.systems;
        },

        // Get a specific system by name
        GetSystem: function(CallBackName) {
            return this.systems.get(CallBackName);
        },

        // Get if the world is running
        GetRunning: function() {
            return this.running;
        },

        GetNextEntityId: function(){
            return nextEntityId;
        },

        GetEntitiesById: function(){
            return entitiesById;
        },

        GetEntitiesByName: function(){
            return entitiesByName;
        },

        // Remove an archetype
        RemoveArchetype: function(ArchetypeName) {
            this.archetypes.delete(ArchetypeName);
        },

        // Remove a component from an entity
        RemoveComponent: function(entityName, componentName) {
            const entity = this.entitiesByName.get(entityName);
            if (entity) {
                entity.components.delete(componentName);
            } else {
                throw new Error(`Entity with name "${entityName}" not found.`);
            }
        },

        // Remove an entity by name
        RemoveEntity: function(entityName) {
            const entity = this.entitiesByName.get(entityName);
            if (entity) {
                this.entitiesById.delete(entity.id); // Remove from entitiesById
                for (let archetype of this.archetypes.values()) {
                    archetype.delete(entity.id); // Remove from archetypes
                }
                this.entitiesByName.delete(entityName); // Remove from entitiesByName
            } else {
                throw new Error(`Entity with name "${entityName}" not found.`);
            }
        },

        // Remove a system by name
        RemoveSystem: function(CallBackName) {
            this.systems.delete(CallBackName);
        },

        // Set the world running state
        SetRunning: function(running) {
            this.running = running;
        }
    };
}

// Start game loop
function Start(world, FPS) {
    let lastTime = performance.now();
    let frameCount = 0;

    world.frameId = requestAnimationFrame(function gameLoop(currentTime) {
        let deltaTime = currentTime - lastTime;
        lastTime = currentTime;

        frameCount++;
        if (deltaTime >= 1000) {
            world.fps = frameCount;
            frameCount = 0;
            if(FPS) console.log("FPS: " + world.fps);
        }

        // Call all systems
        world.GetSystems().forEach((system) => {
            system();
        });

        world.frameId = requestAnimationFrame(gameLoop);
    });
}

// Cleanup after the game ends
function Cleanup(world) {
    if (world.frameId !== null) {
        cancelAnimationFrame(world.frameId);
        world.frameId = null;
    }

    world.systems.clear();
    world.archetypes.clear();
    world.entitiesById.clear();
    world.entitiesByName.clear();
}
