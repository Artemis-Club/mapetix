import openrouteservice
from openrouteservice.directions import directions

coords = ((-0.3589077,39.480609),(-0.3610124,39.4661817))

client = openrouteservice.Client(key='5b3ce3597851110001cf6248e0ff7633132b4e19b4568de986c8502c') # Specify your personal API key
client.directions(coords, dry_run='true')

print(routes)