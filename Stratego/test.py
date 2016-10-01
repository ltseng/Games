#Board
#Gamepiece
#Player
#Game

import os, sys
import pygame
from pygame.locals import *

pygame.init()
size = width, height = 640, 640

screen = pygame.display.set_mode(size)
try:
    grid = pygame.image.load("grid.jpg").convert()
except pygame.error, message:
    raise message

while 1:
    try:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                sys.exit()

        screen.fill(255,255,255)
        screen.blit(grid)
        pygame.display.flip()
    except pygame.error, message:
        raise message
