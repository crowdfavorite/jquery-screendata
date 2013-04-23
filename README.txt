# Readme

## Requirements

- jQuery v 1.8.3 or greater

## Features

- Normalizes screen height and screen width to the lesser of $window.height() and screen.height or $window.width() and screen.width respectively, normalizing high DPI reported values.
- Normalizes any change to scroll position as as "screendata-scrolled" event, any change to screen dimensions as "screendata-resized" event. Added "screendata-changed" event that fires in either case.
- Normalizes orientation property such that any case where the screen height is greater than the screen width is portrait, otherwise the orientation is landscape.
- Fires its change events periodically, maximum frequency of 1/10th of a second to limit load on event handling. 

## Changelog

### 1.0
- Initial release
