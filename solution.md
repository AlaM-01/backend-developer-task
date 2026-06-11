# Solution Notes

## Assumptions
- Family member linking is handled via `centralMemberId` on the member record itself (matched existing model design)
- `description` on products is optional, not explicitly required in the spec
- Price stored as `DECIMAL(10, 2)` to support decimal values
- Opening/closing hours stored as full `DATE` timestamps to match existing DTO design
- Pagination defaults to 20 records per page

## Performance Fix
`findAllWithProducts` was fixed by:
1. Adding `separate: true` to the Sequelize include — avoids JOIN row duplication
2. Adding pagination — prevents loading entire dataset into memory


## Testing 
Note: Test files (.spec) have been commented out. To run tests, uncomment the contents of the .spec files and run npm test


**Global exception filter** would standardize all errors to `{ code, message, details }`.
