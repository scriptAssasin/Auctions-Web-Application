from cgi import test
from copy import copy
from itertools import count
import xmltodict
import pprint
import random
import numpy

def matrix_factorization(R, P, Q, K, steps=5000, alpha=0.0002, beta=0.02):
    '''
    R: rating matrix
    P: |U| * K (User features matrix)
    Q: |D| * K (Item features matrix)
    K: latent features
    steps: iterations
    alpha: learning rate
    beta: regularization parameter'''
    Q = Q.T

    for step in range(steps):
        for i in range(len(R)):
            for j in range(len(R[i])):
                if R[i][j] > 0:
                    # calculate error
                    eij = R[i][j] - numpy.dot(P[i,:],Q[:,j])

                    for k in range(K):
                        # calculate gradient with a and beta parameter
                        P[i][k] = P[i][k] + alpha * (2 * eij * Q[k][j] - beta * P[i][k])
                        Q[k][j] = Q[k][j] + alpha * (2 * eij * P[i][k] - beta * Q[k][j])

        eR = numpy.dot(P,Q)

        e = 0

        for i in range(len(R)):

            for j in range(len(R[i])):

                if R[i][j] > 0:

                    e = e + pow(R[i][j] - numpy.dot(P[i,:],Q[:,j]), 2)

                    for k in range(K):

                        e = e + (beta/2) * (pow(P[i][k],2) + pow(Q[k][j],2))
        # 0.001: local minimum
        if e < 0.001:

            break

    return P, Q.T

#########################################################################################

# reading xml file and extracting data
with open('items-0.xml', 'r', encoding='utf-8') as file:
    my_xml = file.read()

my_dict = xmltodict.parse(my_xml)


sellers = {}
categories = set()

for i in range(len((list(my_dict.items())[0][1])['Item'])):
    category = (list(((list(my_dict.items())[0][1])['Item']))[i])['Category'][1]
    categories.add(category)
    sellerID = list((list(((list(my_dict.items())[0][1])['Item']))[i])['Seller'].items())[1][1]
    sellers[sellerID] = category

# getting 10 first users and categories for easier calculations
# problem is scalable

users = list(sellers.keys())
users = users[0:10]
categories = list(categories)[0:10]
categories = set(categories)


# mock dictionary that holds randomly generated category preferences
# for users (the rating method used for the preference is the number of
# times this user viewed a certain category
preferences = {}

for user in users:
    user_categ = []
    for i in range(30):
        user_categ.append(random.choice(list(categories)))
    user_pref = {}
    for category in categories:
        user_pref[category] = user_categ.count(category)
    preferences[user] = user_pref


matrix = []
for user in users:
    user_p = []
    for categ in list(preferences[user].items()):
        user_p.append(categ[1])
    matrix.append(user_p)

pprint.pprint(matrix)

####################################################################

# example run
R = numpy.array(matrix)

N = len(R)
M = len(R[0])
K = 4

P = numpy.random.rand(N,K)
Q = numpy.random.rand(M,K)

nP, nQ = matrix_factorization(R, P, Q, K)
nR = numpy.dot(nP, nQ.T)

print(nR)

