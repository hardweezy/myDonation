const menus = [{
        name: "Dashboard",
        icon: "ti-home",
        url: "/home",
        isMultiLevel: false,
        isOpened: false,
        userCanView : true,                 
        level: []
    },
    {
        name: "My Profile",
        icon: "ti-user",
        url: "#",
        isMultiLevel: true,
        isOpened: false,
        userCanView : true,                 
        level: [{
                name: "Payment Details",
                icon: "",
                url: "/payment-details",
                isMultiLevel: false
            }
            ]
    },
    {
        name: "Messages",
        icon: "ti-clipboard",
        url: "/messages",
        isMultiLevel: false,
        isOpened: false,
        userCanView : false,                 
        level: []
    },
    {
        name: "Provide Help",
        icon: "ti-control-forward",
        url: "#",
        isMultiLevel: true,
        isOpened: false,        
        userCanView : false,                 
        level: [{
                name: "Create Dream",
                icon: "",
                url: "/create-dream",
                isMultiLevel: false
            },{
                name: "Donate",
                icon: "",
                url: "/donate",
                isMultiLevel: false
            },
            {
                name: "Pending",
                icon: "",
                url: "/pending-transactions",
                isMultiLevel: false
            },
            {
                name: "Paid",
                icon: "",
                url: "#",
                isMultiLevel: false
            },
            {
                name: "All Donations",
                icon: "",
                url: "#",
                isMultiLevel: false
            }
        ]
    },
    {
        name: "Get Help",
        icon: "ti-control-backward",
        url: "#",
        isMultiLevel: true,
        isOpened: false,
        userCanView : false,                 
        level: [{
                name: "Withdraw",
                icon: "",
                url: "/view-withdraw",
                isMultiLevel: false
            },
            {
                name: "Confirm",
                icon: "",
                url: "/donations-dashboard",
                isMultiLevel: false
            },
            {
                name: "Confirmed",
                icon: "",
                url: "#",
                isMultiLevel: false
            },
            {
                name: "All Dreams",
                icon: "",
                url: "/view-dreams",
                isMultiLevel: false
            }
        ]
    },
    {
        name: "Earn More",
        icon: "ti-plus",
        url: "#",
        isMultiLevel: true,
        isOpened: false,
        userCanView : false,                 
        level: [{
                name: "All Followers",
                icon: "",
                url: "#",
                isMultiLevel: false
            },
            {
                name: "All Earnings",
                icon: "",
                url: "#",
                isMultiLevel: false
            }
        ]
    },
    {
        name: "News",
        icon: "ti-announcement",
        url: "/news",
        isMultiLevel: true,
        isOpened: false,
        userCanView : false,         
        level: [{
            name: "Breaking News",
            icon: "",
            url: "",
            isMultiLevel: false
        }]
    },
    {
        name: "Tools",
        icon: "ti-announcement",
        url: "/tools",
        isMultiLevel: true,
        isOpened: false,
        userCanView : false,                 
        level: [{
            name: "Breaking News",
            icon: "",
            url: "/breaking-news",
            isMultiLevel: false
        }]
    },
    {
        name: "Logout",
        icon: "ti-power-off",
        url: "logout",
        isMultiLevel: false,
        isOpened: false,
        userCanView : true,                 
        level: []
    },    
]

export default menus