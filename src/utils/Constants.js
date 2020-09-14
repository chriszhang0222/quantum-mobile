export const SESSION_KEY_LOGIN_USER = "SESSION_KEY_LOGIN_USER";
export const SESSION_CSRF = "CSRF";
export const AUTH_TOKEN = "AUTH_TOKEN"
export const COLORS = ['#2a57f5', '#00C292', '#FEC108', '#e2026a',
    '#00d903', '#755ce5', '#6890d4', '#fc5a00',
    '#f9b978', 'rgba(241,35,68,0.84)', 'rgba(3,206,175,0.87)', 'rgba(158,234,148,0.92)']

export const SUPPLIER_TOTAL = "SUPPLIER_TOTAL";

export const reportType = [
    {
        'label': 'Spend by All Suppliers',
        'value': 'supplier'
    },
    {
        'label': 'Spend by Supplier with Country Code',
        'value': 'supplier_with_country'
    },
    {
        'label': 'Supplier with Missing/Expired Certificates',
        'value': 'supplier_expired_cert'
    }
]

export const CHATROOM = "CHAT_ROOM";
export const NEW_CHAT_MESSAGE = "NEW_CHAT_MESSAGE";
export const state_list = [
    ['AK', 'Alaska'],
    ['AL', 'Alabama'],
    ['AR', 'Arkansas'],
    ['AZ', 'Arizona'],
    ['CA', 'California'],
    ['CO', 'Colorado'],
    ['CT', 'Connecticut'],
    ['DC', 'District of Columbia'],
    ['DE', 'Delaware'],
    ['FL', 'Florida'],
    ['GA', 'Georgia'],
    ['HI', 'Hawaii'],
    ['IA', 'Iowa'],
    ['ID', 'Idaho'],
    ['IL', 'Illinois'],
    ['IN', 'Indiana'],
    ['KS', 'Kansas'],
    ['KY', 'Kentucky'],
    ['LA', 'Louisiana'],
    ['MA', 'Massachusetts'],
    ['MD', 'Maryland'],
    ['ME', 'Maine'],
    ['MI', 'Michigan'],
    ['MN', 'Minnesota'],
    ['MO', 'Missouri'],
    ['MS', 'Mississippi'],
    ['MT', 'Montana'],
    ['NC', 'North Carolina'],
    ['ND', 'North Dakota'],
    ['NE', 'Nebraska'],
    ['NH', 'New Hampshire'],
    ['NJ', 'New Jersey'],
    ['NM', 'New Mexico'],
    ['NV', 'Nevada'],
    ['NY', 'New York'],
    ['OH', 'Ohio'],
    ['OK', 'Oklahoma'],
    ['OR', 'Oregon'],
    ['PA', 'Pennsylvania'],
    ['PR', 'Puerto Rico'],
    ['RI', 'Rhode Island'],
    ['SC', 'South Carolina'],
    ['SD', 'South Dakota'],
    ['TN', 'Tennessee'],
    ['TX', 'Texas'],
    ['UT', 'Utah'],
    ['VA', 'Virginia'],
    ['VT', 'Vermont'],
    ['WA', 'Washington'],
    ['WI', 'Wisconsin'],
    ['WV', 'West Virginia'],
    ['WY', 'Wyoming']
]

export const SEARCH_FORM_PRAMS = 'SEARCH_FORM_PRAMS';
export const SUPPLIER_ID = 'SUPPLIER_ID';

export const CERT_TYPES = ['MBE', 'WBE', 'SBE', 'EDWOSB', 'VBE', 'VOSB', 'DVBE', "WOSB",
'SDVOSB', 'SDB', 'LGBT', '8A', 'Disabled', 'HUBZone', 'ANC', 'HBCU', 'ACDBE']

export const CERT_TYPES_IN_CERTIFICATE_SUBMIT = [
    'MBE', 'VBE', 'DBE', 'DVBE', 'HUBZone', 'SDB', 'LGBT', 'ANC', 'SBE'
]

export const ETHNICITY = ['Caucasian', 'African American', 'Native American', 'Asian Subcontinent American',
'Hispanic American', 'Asian Pacific American', 'Undefined']

export const CERT_DIC = {
    'MBE': {
        full: 'MINORITY Business Enterprise',
        desc: ' By selecting this you acknowledge you meet the following requirements. Both current and historical facts are considered in determining ownership qualifications and participation in the management and operations of the company. Your business is a for-profit enterprise. Your business is physically located in the United States or its trust territories. Your business is at least 51% ethnic minority owned. Ethnic minority owned is defined as any business having owner(s) belonging to the following minority groups: African-American, Hispanic-American, Native American, Asian and Pacific Islander American (Asian-Indian included). The minority/ethnic owner(s) of the business are U.S. citizens. The minority/ethnic owner(s) of the business must be active in management and daily business operations.'
    },
    'WBE': {
        full: 'Veteran Business Enterprise',
        desc: 'By selecting this you acknowledge you are a firm that is at least 51% owned and operated by Veterans.'
    },
    'DBE': {
        full: '',
        desc: ''
    },
    'DVBE': {
        full: '',
        desc: ''
    },
    'HUBZONE': {
        full: '',
        desc: 'By selecting you acknowledge you meet the requirement as follows. A business is defined as HUBZone certified if they meet the following criteria: 1. They are a small business as defined by the Small Business Administration (SBA) for size standards. 2. At least 51% owned and controlled by U.S. citizens, or a Community Development Corporation, an agricultural cooperative, or an Indian tribe (including Alaska Native Corporations). 3. The firm\'s principal office (where the greatest number of employees work) must be in a HUBZone. 4. 35% of the firm\'s total workforce must reside in a HUBZone.'
    },
    'SDB': {
        full: 'Small Disadvantaged Business',
        desc: 'By selecting this you acknowledge the personal net worth of majority business owner does not exceed $1,320,000. Items excluded from a person\'s net worth calculation include an individual\'s ownership interest in the applicant firm, and his or her equity in their primary residence. The Firm is at least 51%-owned by a socially and economically disadvantaged individual(s) who also controls the firm. Disadvantaged owner must be a U.S. citizen or lawfully admitted permanent resident of the U.S. Firm must be a small business that meets the SBA\'s size standard and does not exceed $22.41 million in gross annual receipts in the previous three fiscal years.'
    },
    'LGBT':{
        full: '',
        desc: 'By selecting you acknowledge you meet the requirement as follows. A business is defined as LGBTBE certified if they at least 51% owned, operated, managed, and controlled by a LGBT person or persons who are either U.S. citizens or lawful permanent residents. The business exercises independence from any non-LGBT business enterprise.'
    },
    'ANC': {
        full: '',
        desc: ''
    },
    'SBE':{
        full: 'Small Business Enterprise',
        desc: ' By selecting you acknowledge you meet the requirement as follows.A business is defined as a Small Business Enterprise (SBE) if they meet certain economic criteria. Size standards vary by industry, and are based on the number of employees or the amount of annual receipts the business has.'
    },
    'VBE': {
        full: '',
        desc: ''
    }

}

export const cert_upload_rules_agency = {
    type: [{required: true, message: 'Type required', trigger: 'blur'}],
    agency_name: [{required: true, message: 'Agency required', trigger: 'blur'}],
    certexpdate: [{required: true, message: 'Expiration date required', trigger: 'blur'}]
}

