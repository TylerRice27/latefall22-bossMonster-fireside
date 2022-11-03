const hero =
{
    name: 'Spider-man',
    damage: 10,
    health: 100,
    credit: 0,
}

const boss = {
    health: 100,
    maxHealth: 100,
    damage: 5,
    level: 1
}


function update() {
    // @ts-ignore
    document.getElementById('boss-hp').innerText = boss.health
    // @ts-ignore
    document.getElementById('hero-hp').innerText = hero.health
    // @ts-ignore
    document.getElementById('boss-lvl').innerText = boss.level
    // @ts-ignore
    document.getElementById('credits').innerText = hero.credit
}


function attackBoss() {
    if (hero.health <= 0) {
        window.alert("You dead bro")
        return
    }

    boss.health -= hero.damage
    hero.credit += boss.level
    if (boss.health < 0) {
        bossLevelUp()
    }

    // let audio = new Audio('imgs/Spider-Man web shoot sound effect.mp3')
    // audio.play()
    update()

}

function bossLevelUp() {
    boss.level++
    boss.maxHealth = boss.level * 100
    boss.health = boss.maxHealth
    hero.credit += boss.level * 100

}



function bossAttack() {
    boss.damage = boss.damage * boss.level
    hero.health -= boss.damage
    if (hero.health <= 0) {
        hero.health = 0

    }
    update()
}

setInterval(bossAttack, 2000)

