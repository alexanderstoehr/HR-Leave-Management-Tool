# TODO
- add the permissions:
  - only the approver can change the statusApproval of the absenceRequest and Training Request
  - the requester can only publish absence and training as Pending
  - only the requester can modify the statusAdvancement of the Training
- Validations in the serializers
  - TBC
- views:
  - absenceRequests
    - POST one request with the logged in user: statusApproval fixed to Pending
      - if it is for sickness, accepted automatically
    - GET all requests of all users
    - GET all requests of all team members whose approver is the logged in user
    - GET all requests of all team members of the logged in users: having the same approver as the logged in user
    - PATCH approveStatus of the requests of the users for which the logged in user is the approver (only is an approver)
  - TrainingRequests
    - POST one request with the logged in user: statusApproval fixed to Pending
    - GET all requests of all users
    - GET all requests of all team members whose approver is the logged in user
    - GET all requests of all team members of the logged in users: having the same approver as the logged in user
    - PATCH approveStatus of the requests of the users for which the logged in user is the approver
  - TimeDependentVar
    - GET all info of a selected user
    - GET all info of the logged in user only -> personal page
    - GET all info for all users of a single department or with the same approver as the logged in user
  - CompaniesProfile
    - GET the info of the company of the logged-in user
    - PATCH company info (only by admin of company)
  - Department
    - GET the info of the department of the logged-in user
    - PATCH dept info (only by admin of company)
  - userProfile
    - GET info of the logged in user for the year selected
    - GET the info of all users the logged-in user is approver of
- Filtering / Validation:
  - fetch only the data of a particular company
  - fetch the data of the employees whose approver is either the same as the logged in user or the logged-in user
  - test what happens if we have 2 companies 


# ...................................................................

# DONE
- models:
  - test userProfile linked to itself
- 