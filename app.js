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

const companions = [
    {
        name: 'Wolverine',
        type: 'dmg',
        value: 5,
        health: 150,
        cost: 100,
        power: 0,
        img: 'https://media2.giphy.com/media/HTy0GcFDvOVi0/giphy.gif'
    },
    {
        name: 'Iron-man',
        type: 'dmg',
        value: 15,
        health: 100,
        cost: 200,
        power: 0,
        img: "https://media1.giphy.com/media/7EiixpldfkXni/giphy.gif?cid=ecf05e470ymdtyll84dy0v9d66xiq0et3sqlzux9sf9ifv9c&rid=giphy.gif&ct=s"

    },
    {
        name: 'Deadpool',
        type: 'heal',
        value: 10,
        health: 100,
        cost: 500,
        power: 0,
        img: "https://media3.giphy.com/media/TAbghspb8GP4I/200w.webp?cid=ecf05e47iusv43aubq8g15qe54v33cvtt327gqjf7nbaaouo&rid=200w.webp&ct=s"

    }

]


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

    let audio = new Audio('imgs/Spider-Man web shoot sound effect.mp3')
    audio.play()
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


function buy(name) {
    let companion = companions.find(f => f.name == name)
    console.log(companion);
    if (!companion) {
        return
    }
    if (hero.credit < companion.cost) {
        window.alert("Go farm some more credits")
        return
    }

    hero.credit -= companion.cost


    companion.power++
    console.log(companion.power);

    drawCompanions(companion)
    companionActions()
    update()




}

function drawCompanions(companion) {
    let template = `
    <div class="d-flex flex-column align-items-center"
    <div class="bg-dark rounded p-1">
                    <h3 class="text-light  m-0 pt-2  text-center text-shadow">Level:${companion.power}</h3>
                </div>
                <img class="hero-img"
                    src="${companion.img}"
                    alt="">
            </div>
    `
    document.getElementById(`${companion.name}`).innerHTML = template

}

function damageBoss(damage) {
    boss.health -= damage
    if (boss.health < 0) {
        bossLevelUp()
    }
    update()
}

function healHero(val) {
    hero.health += val
    if (hero.health >= 100) {
        hero.health = 100
    }
    update()

}

function companionActions() {
    companions.forEach(c => {
        console.log(c);
        if (c.health <= 0) {
            c.health = 0
            return
        } if (c.type == "dmg") {
            let damage = c.power * c.value
            damageBoss(damage)
        } else {
            let heal = c.power * c.value
            healHero(heal)
        }

    })

}

setInterval(companionActions, 3000)

