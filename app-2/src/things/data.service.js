var _ = require('lodash');

var allThings = [
    {
        id: 1,
        name: "This thing",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris accumsan massa augue, quis luctus urna congue et. Phasellus ut sem sed odio commodo egestas. Sed pretium, felis ut lobortis tristique, tellus erat tincidunt risus, ac aliquam dolor augue vitae arcu. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent a ligula vel nulla auctor pretium. Proin ut elit purus. Sed quis vestibulum nulla, quis porttitor leo. Sed finibus elit erat, ac elementum leo sollicitudin vitae. Nullam convallis, dolor nec faucibus fermentum, metus sapien dapibus elit, sed gravida lectus magna non massa. Praesent eget eros viverra, efficitur ipsum et, gravida augue. Maecenas placerat nisl a lectus dictum, ut porta purus euismod.\n\nDonec sed tellus et erat dignissim ultricies sed sed mauris. Aliquam ut euismod arcu. Aliquam id semper felis, nec ultrices ante. Vestibulum ac mi nec velit malesuada vehicula. Integer accumsan suscipit odio id condimentum. In laoreet eget odio bibendum euismod. Nullam ac dictum nulla. Integer lacinia eget augue eu elementum. Sed laoreet elit quam, non elementum mi ullamcorper eget. Maecenas ac ullamcorper nisl. Sed vitae eros ut nisl molestie vehicula mollis eu ex. Aliquam pellentesque leo vel hendrerit tincidunt."
    },
    {
        id: 2,
        name: "That thing",
        description: "Seitan cliche helvetica raw denim, taxidermy shoreditch jean shorts. Letterpress bespoke hammock, lomo typewriter disrupt pitchfork trust fund deep v DIY four loko man bun mlkshk kinfolk. Chartreuse crucifix thundercats, lomo messenger bag ennui semiotics next level fixie cardigan flannel seitan kickstarter. Occupy irony waistcoat literally. Shabby chic roof party seitan crucifix cray, four loko banjo gochujang kogi intelligentsia ennui blue bottle disrupt. Taxidermy sriracha you probably haven't heard of them, hashtag hella chillwave yuccie kombucha godard art party tilde VHS irony. Williamsburg tumblr man braid post-ironic celiac messenger bag actually leggings cliche.\n\nMlkshk tousled drinking vinegar, franzen viral brooklyn authentic jean shorts messenger bag 90's four dollar toast artisan. Fashion axe quinoa XOXO, irony flannel authentic cray selvage roof party gastropub food truck bicycle rights. Blog portland lumbersexual, fingerstache trust fund quinoa irony intelligentsia microdosing health goth chillwave roof party godard vinyl. Knausgaard cardigan four dollar toast, thundercats ennui hashtag cred trust fund distillery direct trade lo-fi pour-over poutine portland. Affogato cronut try-hard whatever, semiotics humblebrag fap polaroid blog. Next level mustache godard deep v selvage, chartreuse butcher. Pitchfork mumblecore flannel venmo echo park, post-ironic brunch four loko etsy cornhole neutra."
    },
    {
        id: 3,
        name: "Third thing",
        description: "Cough furball sleep nap for burrow under covers cat slap dog in face. Ignore the squirrels, you'll never catch them anyway hiss at vacuum cleaner. Mark territory vommit food and eat it again vommit food and eat it again gnaw the corn cob and meowing non stop for food cat slap dog in face chew on cable. Put toy mouse in food bowl run out of litter box at full speed if it smells like fish eat as much as you wish eat and than sleep on your face, so tuxedo cats always looking dapper mark territory, for hide at bottom of staircase to trip human. Sun bathe plan steps for world domination or eat prawns daintily with a claw then lick paws clean wash down prawns with a lap of carnation milk then retire to the warmest spot on the couch to claw at the fabric before taking a catnap cat slap dog in face but brown cats with pink ears meowing non stop for food. Spot something, big eyes, big eyes, crouch, shake butt, prepare to pounce cat slap dog in face attack the dog then pretend like nothing happened paw at your fat belly yet you call this cat food?. Instantly break out into full speed gallop across the house for no reason leave hair everywhere make muffins refuse to drink water except out of someone's glass steal the warm chair right after you get up kick up litter. Eat a plant, kill a hand intently sniff hand mew stand in front of the computer screen, and meowing non stop for food. Sleep on dog bed, force dog to sleep on floor kitty power! stare at ceiling, so meowzer! so stare at wall turn and meow stare at wall some more meow again continue staring . Missing until dinner time hide at bottom of staircase to trip human so immediately regret falling into bathtub i like big cats and i can not lie human is washing you why halp oh the horror flee scratch hiss bite instantly break out into full speed gallop across the house for no reason. Mark territory. Jump launch to pounce upon little yarn mouse, bare fangs at toy run hide in litter box until treats are fed poop on grasses. Attack dog, run away and pretend to be victim under the bed throwup on your pillow if it smells like fish eat as much as you wish hide from vacuum cleaner. Poop in the plant pot sit in box, and sweet beast. Chew iPad power cord paw at beetle and eat it before it gets away. Chase after silly colored fish toys around the house touch water with paw then recoil in horror brown cats with pink ears lick yarn hanging out of own butt, but attack feet, and meow all night having their mate disturbing sleeping humans mew. Where is my slave? I'm getting hungry brown cats with pink ears. Meow fall over dead (not really but gets sypathy) yet always hungry i am the best but sleep on dog bed, force dog to sleep on floor. Inspect anything brought into the house shake treat bag. Who's the baby eat a plant, kill a hand immediately regret falling into bathtub so sit on the laptop leave dead animals as gifts, or stare at ceiling light, chase laser. Spot something, big eyes, big eyes, crouch, shake butt, prepare to pounce scratch leg; meow for can opener to feed me climb leg. If it fits, i sits rub face on everything scamper for eat prawns daintily with a claw then lick paws clean wash down prawns with a lap of carnation milk then retire to the warmest spot on the couch to claw at the fabric before taking a catnap. You call this cat food? shove bum in owner's face like camera lens yet climb a tree, wait for a fireman jump to fireman then scratch his face if it fits, i sits but spread kitty litter all over house."
    }
];

module.exports = function($q) {

    return {
        findAll: findAllThings,
        findById: findById
    };


    function findAllThings() {
        return $q.when(_.cloneDeep(allThings));
    }

    function findById(id) {
        var thing = _.find(allThings, {'id': _.toNumber(id)});
        if (thing) {
            return $q.when(_.cloneDeep(thing));
        } else {
            return $q.reject({status: 404});
        }
    }

};


