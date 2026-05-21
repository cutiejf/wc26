# How to Update Scores

All scores are stored directly in the JSON data in `book-groups.js`.

## Group Stage Matches

Find the match by ID in the `GROUPS` object and set `hs` (home score) and `as` (away score):

```javascript
// Example: Mexico 2-1 South Africa (Match #1)
{id:1, date:'Jun 11', time:'3:00p', h:'MEX', a:'RSA', hs:'2', as:'1'},
```

## Knockout Matches

Same format for knockout matches in the `KNOCKOUT` object:

```javascript
// Example: Match #73 ends 3-2
{id:73, date:'Jun 28', time:'3:00p', h:'2A', a:'2B', hs:'3', as:'2'},
```

## Automatic Updates

When you add scores, the following updates automatically:

### Group Stage
- **Standings**: GP, W, D, L, GF, GA, GD, PTS recalculate
- **Points**: 3 for win, 1 for draw, 0 for loss
- **Ranking**: Sorted by PTS → GD → GF

### Knockout Rounds
- **Team Resolution**: Codes like `1A`, `2B`, `3ABCDF` resolve to actual teams
- **Winners**: `W73` means winner of match 73
- **Losers**: `L101` means loser of match 101 (for 3rd place match)
- **Third Place Teams**: `3ABCDF` = best 3rd place team from groups A-F

## Example Workflow

1. **Enter Group Stage Results**:
   ```javascript
   {id:1, date:'Jun 11', time:'3:00p', h:'MEX', a:'RSA', hs:'3', as:'1'},
   {id:2, date:'Jun 11', time:'10:00p', h:'KOR', a:'POD', hs:'2', as:'0'},
   ```

2. **Standings Update Automatically**: Mexico and Korea top Group A

3. **Knockout Teams Resolve**: Match #73 shows `MEX vs CAN` instead of `1A vs 2B`

4. **Enter Knockout Result**:
   ```javascript
   {id:73, date:'Jun 28', time:'3:00p', h:'1A', a:'2B', hs:'2', as:'1'},
   ```

5. **Next Round Updates**: Match #90 resolves `W73` → `MEX`

## No Manual Editing Required

- Score boxes in the UI are **display only**
- Standings cells are **auto-calculated**
- All updates happen by editing the JSON in `book-groups.js`

Simply add scores to the match objects and refresh the page!
