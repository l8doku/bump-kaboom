# bump-kaboom

A collision library [bump.ts](https://github.com/hood/bump.ts) turned into a plugin for [Kaboom](https://kaboomjs.com).  
Based on [bump.lua](https://github.com/kikito/bump.lua).

Features, compared to Kaboom v2000.2.9:

1. Fast. Uses hash grids to only check collisions with nearby objects.
2. Provides collision information a bit better than Kaboom.
3. Precise. Uses 4 types of collision responses: "cross", "slide", "touch", "bounce" to handle the final small movement during the collision frame.

Limits:

1. Only does axis-aligned bounding-box (AABB) collisions, so rectangles with no rotation.
2. It's a port of a port, so there are likely usability issues and there might be problems with Kaboom integration. 

# Installation and usage

Get the file `bump-kaboom.js` from the `dist` directory in this repository. Import it as a plugin:

```js
import bumpKaboom from "../dist/bump-kaboom.js"
const k = kaboom({
    plugins: [bumpKaboom]
});

```

Add a `k.barea()` component to your game objects. Make sure you also have components `pos` and `area`.


```js
const player = add([
    sprite("bean"),
    pos(vec2(300, 300)),
    origin("center"),
    area(),
    k.barea()
])

add([
    pos(vec2(600, 0)),
    rect(20, 600),
    area(),
    k.barea(),
    "wall"
])
```

Set up collision responses based on tags (explanation below or [here](https://github.com/kikito/bump.lua#collision-resolution))

```js
player.addBumpCollision("wall", "slide");
```

Move your game object with `bmove` instead of `move`.

```js
onKeyDown("up", () => {
    player.bmove(0, -player.speed);
})
```

Now `player` won't pass through walls anymore!

To add collision callbacks, use the third parameter of `addBumpCollision`.

```js
player.addBumpCollision("enemy", "touch", (wall, cls) => {
    addKaboom(player.pos)
    player.destroy()
})

```

# Collision information and collision resolution

Everything here is based on the original `bump.lua` documentation, so you can read that to get more information. https://github.com/kikito/bump.lua

## Collision information

The function `addBumpCollision` gives you a Collision object that contains the following fields:

-  `itemObj`: game object that is checking collision right now. `player` in the example above.
-  `otherObj`: game object that `itemObj` collides with.
-  `overlaps`: boolean value. `true` if the objects were overlapping when the collision started.
-  `normal`:  the collision normal in the format `{x:0, y:0}`; usually `x` and `y` are equal to either `0`, `1` or `-1`.
-  `type`: collision response type. Must be `'touch'`, `'cross'`, `'slide'` or `'bounce'`.
-  `ti`: number between 0 and 1. How far along the movement to the goal did the collision occur?
-  `move`: `{x:number, y:number}`. The difference between the original coordinates and the actual ones.
-   `touch`: `{x:number, y:number}`. The coordinates where `itemObj` started touching `otherObj`.
-   `itemRect`: the rectangle item occupied when the touch happened (`{x: N, y: N, w: N, h: N}`)
-   `otherRect` = The rectangle other occupied when the touch happened (`{x: N, y: N, w: N, h: N}`)

`normal` here is especially important as it allows you to more precisely determine if the collision occured during vertical or horizontal movement.

## Collision resolution

The way four default collision types work are:

1. `"cross"` - objects pass through each other, but collisions are recognized. Useful for picking up items like coins and for other cases where the object doesn't hinder the player's movement, but you want to detect the collision anyway.
2. `"slide"` - objects don't pass through each other. When moving diagonally and hitting a vertical wall, "slides" one object across another, continuing vertical movement along the wall, but stopping horizontal movement. Same logic applies to horizontal walls. Should be useful for most cases, like "player collides with walls".
3. `"touch"` - objects don't pass through each other. When colliding, an object gets "stuck" and can't slide along the wall by moving diagonally. Should be useful for projectiles that get stuck in walls. Even if you stop the movement, `"slide"` will let the projectile slide along the wall for the first frame. `"touch"` will stop it precisely at the point of collision.
4. `"bounce"` - objects don't pass through each other. When collising, an object bounces back during the collision frame. This doesn't change the velocity of an object, but lets you set up bouncing more precisely.

