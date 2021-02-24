const ROLE={
    ADMIN:'admin',
    BASIC:'basic'
}

module.exports={
    ROLE:ROLE,
    users:[
        { id:1 ,name:'Sandy' ,role:ROLE.ADMIN},
        { id:2 ,name:'Candy' ,role:ROLE.BASIC},
        { id:3 ,name:'Landy' ,role:ROLE.BASIC},
    ];
    projects:[
        { id:1 ,name:'Sandy WebPage' ,userId:1},
        { id:2 ,name:'Candy MobileApp' ,userId:2},
        { id:3 ,name:'Landy ArduinoProject' ,userId:3},
    ]
}