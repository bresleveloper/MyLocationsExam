# MyLocationsExam

Project given as a test, was very interesting, also I learned alot about maps 

## More Notes

I've made generic base service and component, since the demands were quite similar.

The service was 100% exact, the big "base-list" component, no so much, 
I should have made a much smaller component, or event just a base class for it, 
attaching a different html.

Also the part I used `ng-content` would have better been 2 sub/nested-component

The grouped-by locations component was the break point where I could not have adapted 
the generic component anymore, and therefor the results, another route page, 
is a relatively poor solution

If I would to refactor the code I would make the component handling the 
`mat-selection-list` small enough to be able to use it multiple times with groups

Also if I had more time I would take out the ngFor input as an @Input instead of handling it
inside the component, that way I could have make a "stop" to the service's observable
and pipe it as much as I want at the hosting component level.
That is also why i've hidden the filters in location by category page.

Yet I'm still proud

## TODO wish list

1. Make a "send to waze" button
2. Search location by address
3. The above notes