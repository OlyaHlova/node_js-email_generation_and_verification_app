var handlebars = require('handlebars');

handlebars.registerHelper('if_all', function () {
    var args = [].slice.apply(arguments);
    var opts = args.pop();

    var fn = opts.fn;
    for (var i = 0; i < args.length; ++i) {
        if (args[i])
            continue;
        fn = opts.inverse;
        break;
    }
    return fn(this);
});

let localRules = [
    '{{#if firstName}}{{firstName}}@{{companyDomain}}.{{commonDomain}}{{/if}}',
    '{{#if lastName}}{{lastName}}@{{companyDomain}}.{{commonDomain}}{{/if}}',
    '{{#if_all firstName lastName}}{{firstName}}@{{companyDomain}}.{{commonDomain}}{{/if_all}}',
    '{{#if_all firstName lastName}}{{lastName}}@{{companyDomain}}.{{commonDomain}}{{/if_all}}',
    '{{#if_all firstName lastName}}{{firstName}}{{lastName}}@{{companyDomain}}.{{commonDomain}}{{/if_all}}',
    '{{#if_all firstName lastName}}{{lastName}}{{firstName}}@{{companyDomain}}.{{commonDomain}}{{/if_all}}',
    '{{#if_all firstName lastName}}{{firstName}}.{{lastName}}@{{companyDomain}}.{{commonDomain}}{{/if_all}}',
    '{{#if_all firstName lastName}}{{lastName}}.{{firstName}}@{{companyDomain}}.{{commonDomain}}{{/if_all}}',
    '{{#if_all firstName lastName}}{{firstName}}-{{lastName}}@{{companyDomain}}.{{commonDomain}}{{/if_all}}',
    '{{#if_all firstName lastName}}{{lastName}}-{{firstName}}@{{companyDomain}}.{{commonDomain}}{{/if_all}}',
    '{{#if_all firstName lastName}}{{firstName}}_{{lastName}}@{{companyDomain}}.{{commonDomain}}{{/if_all}}',
    '{{#if_all firstName lastName}}{{lastName}}_{{firstName}}@{{companyDomain}}.{{commonDomain}}{{/if_all}}',
    '{{#if_all firstName lastNameInitial}}{{firstName}}{{lastNameInitial}}@{{companyDomain}}.{{commonDomain}}{{/if_all}}',
    '{{#if_all firstName lastNameInitial}}{{firstName}}.{{lastNameInitial}}@{{companyDomain}}.{{commonDomain}}{{/if_all}}',
    '{{#if_all firstName lastNameInitial}}{{firstName}}-{{lastNameInitial}}@{{companyDomain}}.{{commonDomain}}{{/if_all}}',
    '{{#if_all firstName lastNameInitial}}{{firstName}}_{{lastNameInitial}}@{{companyDomain}}.{{commonDomain}}{{/if_all}}',
    '{{#if_all lastName firstNameInitial}}{{lastName}}{{firstNameInitial}}@{{companyDomain}}.{{commonDomain}}{{/if_all}}',
    '{{#if_all lastName firstNameInitial}}{{lastName}}.{{firstNameInitial}}@{{companyDomain}}.{{commonDomain}}{{/if_all}}',
    '{{#if_all lastName firstNameInitial}}{{lastName}}-{{firstNameInitial}}@{{companyDomain}}.{{commonDomain}}{{/if_all}}',
    '{{#if_all lastName firstNameInitial}}{{lastName}}_{{firstNameInitial}}@{{companyDomain}}.{{commonDomain}}{{/if_all}}',
    '{{#if_all firstNameInitial lastName}}{{firstNameInitial}}{{lastName}}@{{companyDomain}}.{{commonDomain}}{{/if_all}}',
    '{{#if_all firstNameInitial lastName}}{{firstNameInitial}}.{{lastName}}@{{companyDomain}}.{{commonDomain}}{{/if_all}}',
    '{{#if_all firstNameInitial lastName}}{{firstNameInitial}}-{{lastName}}@{{companyDomain}}.{{commonDomain}}{{/if_all}}',
    '{{#if_all firstNameInitial lastName}}{{firstNameInitial}}_{{lastName}}@{{companyDomain}}.{{commonDomain}}{{/if_all}}',
    '{{#if_all firstNameInitial lastNameInitial}}{{firstNameInitial}}{{lastNameInitial}}@{{companyDomain}}.{{commonDomain}}{{/if_all}}',
    '{{#if_all firstNameInitial lastNameInitial}}{{firstNameInitial}}.{{lastNameInitial}}@{{companyDomain}}.{{commonDomain}}{{/if_all}}',
    '{{#if_all firstNameInitial lastNameInitial}}{{firstNameInitial}}-{{lastNameInitial}}@{{companyDomain}}.{{commonDomain}}{{/if_all}}',
    '{{#if_all firstNameInitial lastNameInitial}}{{firstNameInitial}}_{{lastNameInitial}}@{{companyDomain}}.{{commonDomain}}{{/if_all}}',
    '{{#if_all lastNameInitial firstName}}{{lastNameInitial}}{{firstName}}@{{companyDomain}}.{{commonDomain}}{{/if_all}}',
    '{{#if_all lastNameInitial firstName}}{{lastNameInitial}}.{{firstName}}@{{companyDomain}}.{{commonDomain}}{{/if_all}}',
    '{{#if_all lastNameInitial firstName}}{{lastNameInitial}}-{{firstName}}@{{companyDomain}}.{{commonDomain}}{{/if_all}}',
    '{{#if_all lastNameInitial firstName}}{{lastNameInitial}}_{{firstName}}@{{companyDomain}}.{{commonDomain}}{{/if_all}}',
    '{{#if_all lastNameInitial firstNameInitial}}{{lastNameInitial}}{{firstNameInitial}}@{{companyDomain}}.{{commonDomain}}{{/if_all}}',
    '{{#if_all lastNameInitial firstNameInitial}}{{lastNameInitial}}.{{firstNameInitial}}@{{companyDomain}}.{{commonDomain}}{{/if_all}}',
    '{{#if_all lastNameInitial firstNameInitial}}{{lastNameInitial}}-{{firstNameInitial}}@{{companyDomain}}.{{commonDomain}}{{/if_all}}',
    '{{#if_all lastNameInitial firstNameInitial}}{{lastNameInitial}}_{{firstNameInitial}}@{{companyDomain}}.{{commonDomain}}{{/if_all}}',

];

let localTemplates = [];

for (let i = 0; i < localRules.length; i++) {
    var localTemplate = handlebars.compile(localRules[i]);
    localTemplates.push(localTemplate);
}

let commonDomains = [
    'com',
    'org',
    'ua',
];

function buildList (firstName, lastName, companyDomain) {  
        let arguments = {};
            mailingList = [];       

        if (!firstName && !lastName && !companyDomain) {
            return mailingList;
        }
        if (firstName) {
            arguments.firstName = firstName;
            arguments.firstNameInitial = firstName.substring(0, 1);
        }
        if (lastName) {
            arguments.lastName = lastName;
            arguments.lastNameInitial = lastName.substring(0, 1);
        }

        if (companyDomain) {
            arguments.companyDomain = companyDomain;
        }

        for (let i = 0; i < commonDomains.length; i++) {
            arguments.commonDomain = commonDomains[i]; 
            for (let i = 0; i < localTemplates.length; i++) {
                let template = localTemplates[i];
                let result = template(arguments);
                if (result) {
                    result = result.toLowerCase();
                    mailingList.push(result);
                }
            }
        }
        return mailingList;
        
        //console.log('результат' + mailingList);
    }
    console.log(buildList ('Petro', 'Ivanov', 'Ralabs'));
   
