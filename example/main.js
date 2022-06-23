import kaboom from "https://unpkg.com/kaboom@2000.2.9/dist/kaboom.mjs";
import bumpKaboom from "../dist/bump-kaboom.js"
const k = kaboom({
    background: [180, 180, 210],
    width: 600,
    height: 600,
    plugins: [bumpKaboom]
});

k.loadSprite("mage", "./sprites/mage.png");

const BLOCK_SIZE = 30;
const MOVE_UP_KEY = "w";
const MOVE_LEFT_KEY = "a";
const MOVE_RIGHT_KEY = "d";
const MOVE_DOWN_KEY = "s";
const MOVE_UP_KEY2 = "up";
const MOVE_LEFT_KEY2 = "left";
const MOVE_RIGHT_KEY2 = "right";
const MOVE_DOWN_KEY2 = "down";

const levelOptAscii = {
    width: BLOCK_SIZE,
    height: BLOCK_SIZE,
    pos: vec2(0, 0),
    "1": () => [
        rect(BLOCK_SIZE, BLOCK_SIZE),
        color(0, 0, 130),
        area(),
        k.barea(),
        "wall",
    ],
};

const levelAscii = [
    "11111111111111111111",
    "1..................1",
    "1..................1",
    "1..................1",
    "1..................1",
    "1..................1",
    "1..................1",
    "1..................1",
    "1..................1",
    "1..................1",
    "1..................1",
    "1..................1",
    "1..................1",
    "1..................1",
    "1..................1",
    "1..................1",
    "1..................1",
    "1..................1",
    "1..................1",
    "11111111111111111111",
];

addLevel(levelAscii, levelOptAscii);

function spawnBullet(startPos, direction) {
    const size = 10;
    const speed = 600;
    const bulletVelocity = direction.scale(speed);

    const bullet = add([
        rect(size, size),
        pos(startPos),
        k.origin("center"),
        color(0, 200, 0),
        area(),
        k.barea(),
        lifespan(5),
        { hits: 2 },
        { velocity: bulletVelocity }
    ]);

    bullet.onUpdate(() => {
        bullet.bmove(bullet.velocity);
    });

    bullet.onBumpCollision("wall", (_, cls) => {
        if (cls.normal.x != 0) {
            bullet.velocity.x = -bullet.velocity.x / 2;
        }

        if (cls.normal.y != 0) {
            bullet.velocity.y = -bullet.velocity.y / 2;
        }

        bullet.hits -= 1;

        if (bullet.hits == 1) {
            bullet.color = YELLOW;
        }

        else if (bullet.hits == 0) {
            bullet.color = RED;
        }
    });
    bullet.addBumpCollision('wall', 'bounce');
}

function shoot(playerPos) {
    const worldMousePos = toWorld(mousePos());
    const shootAngle = worldMousePos.angle(playerPos) + rand(-15, 15);
    const bulletDirection = k.Vec2.fromAngle(shootAngle);
    const randomOffset = k.Vec2.fromAngle(rand(0, 360)).scale(rand(0, 50));
    const bulletSpawnPos = playerPos.add(randomOffset);
    spawnBullet(bulletSpawnPos, bulletDirection);
}

let shootTimer = 0;

const player = add([
    sprite("mage"),
    pos(vec2(300, 300)),
    k.origin("center"),
    area(),
    k.barea(),
    { speed: 300,
        shootPressed: false,
        shootCooldown: 0.02 }
]);

player.addBumpCollision('wall', 'slide');

// shooting timer
player.onUpdate(() => {
    const cdt = dt();
    if (player.shootPressed) {
        shootTimer -= cdt;
        while (shootTimer < 0) {
            shoot(player.pos);
            shootTimer += player.shootCooldown;
        }
    }
});

// player control
onKeyDown([MOVE_UP_KEY, MOVE_UP_KEY2], () => {
    player.bmove(0, -player.speed);
});

onKeyDown([MOVE_LEFT_KEY, MOVE_LEFT_KEY2], () => {
    player.bmove(-player.speed, 0);
});

onKeyDown([MOVE_DOWN_KEY, MOVE_DOWN_KEY2], () => {
    player.bmove(0, player.speed);
});

onKeyDown([MOVE_RIGHT_KEY, MOVE_RIGHT_KEY2], () => {
    player.bmove(player.speed, 0);
});

onMousePress("left", () => {
    player.shootPressed = true;
});

onMouseRelease("left", () => {
    player.shootPressed = false;
});

// fps, obj count text
const uiMenuText = add([
    pos(10, 10),
    text("Ui menu text", {
        size: 20,
        width: 200
    }),
    fixed(),
    color(255, 255, 255),
    {
        calls: 0,
        objs: 0,
        fps: 0
    }
]);

uiMenuText.onUpdate(() => {
    uiMenuText.calls = debug.drawCalls();
    uiMenuText.objs = debug.objCount();
    uiMenuText.fps = debug.fps();
    let uiText = `Draw calls: ${uiMenuText.calls}\nObjects: ${uiMenuText.objs}\nFPS: ${uiMenuText.fps}\n`;
    uiMenuText.text = uiText;
});
