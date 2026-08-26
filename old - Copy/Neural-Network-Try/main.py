import random
import math

class Network:
  def __init__(self, layers):
    self.layers = layers

  def train(self, expected, learning_rate):
    all_outputs = []
    all_errors = []

    for layer_index, layer in enumerate(self.layers[::-1]):
      if layer_index == len(self.layers) - 1: continue
      output_layer = []
      error_layer = []

      for node_index, node in enumerate(layer.nodes):
        output_layer.append(node.calculate())
        if layer_index == 0:
          error = output_layer[node_index] * (1 - output_layer[node_index]) * (expected[node_index] - output_layer[node_index])
          error_layer.append(error)
        else:
          error = output_layer[node_index] * (1 - output_layer[node_index])
          nodes_forward = self.layers[len(self.layers) - layer_index].nodes
          weights_errors_forward = []

          for index_node_forward, node_forward in enumerate(nodes_forward):
            if node_index in node_forward.input_nodes_indices:
              weights_errors_forward.append(node_forward.weights[node_forward.input_nodes_indices.index(node_index)] * all_errors[layer_index - 1][index_node_forward])

          error *= sum(weights_errors_forward)
          error_layer.append(error)

        weight_change = learning_rate * error * output_layer[node_index]
        bias_change = learning_rate * error

        if layer_index == 0:
          weight_change *= 5

        node.weights = list(map(lambda weight: weight + weight_change, node.weights))
        node.biases = list(map(lambda bias: bias + bias_change, node.weights))

      all_outputs.append(output_layer)
      all_errors.append(error_layer)

class Layer:
  def __init__(self, nodes):
    self.nodes = nodes

class Node:
  def __init__(self, layer_index, input_nodes_indices, is_output, biases):
    self.layer_index = layer_index
    self.input_nodes_indices = input_nodes_indices
    self.weights = [random.uniform(-0.5, 0.5) for _ in range(len(input_nodes_indices))]
    if biases:
      self.biases = biases
    else:
      self.biases = [random.uniform(-0.5, 0.5) for _ in range(len(input_nodes_indices))]
    self.is_output = is_output

  def calculate(self):
    sum = 0

    for i, node_index in enumerate(self.input_nodes_indices):
      sum += network_info.layers[self.layer_index - 1].nodes[node_index].calculate() * self.weights[i] + self.biases[i]

    return 1 / (1 + math.e ** -sum)

class Input_Node:
  def __init__(self, value):
    self.value = value

  def calculate(self):
    return self.value

def create_network(layers):
  return Network(layers)

def create_layer(nodes):
  return Layer(nodes)

def create_node(layer_index, input_nodes_indices, is_output = False, biases = None):
  return Node(layer_index, input_nodes_indices, is_output, biases)

def create_input_node(value):
  return Input_Node(value)

network_info = create_network([
  create_layer([
    create_input_node(0),     #  0
    create_input_node(0),     #6   1
    create_input_node(0),     #  5
    create_input_node(0),     #4   2
    create_input_node(0),     #  3
    create_input_node(0),
    create_input_node(0)
  ]),
  create_layer([
    create_node(1, list(range(6))),
    create_node(1, list(range(6))),
    create_node(1, list(range(6))),
    create_node(1, list(range(6))),
    create_node(1, list(range(6))),
    create_node(1, list(range(6))),
    create_node(1, list(range(6))),
    create_node(1, list(range(6))),
    create_node(1, list(range(6))),
    create_node(1, list(range(6))),
    create_node(1, list(range(6))),
    create_node(1, list(range(6))),
    create_node(1, list(range(6))),
    create_node(1, list(range(6))),
    create_node(1, list(range(6))),
    create_node(1, list(range(6))),
    create_node(1, list(range(6))),
    create_node(1, list(range(6))),
    create_node(1, list(range(6))),
    create_node(1, list(range(6)))
  ]),
  create_layer([
    create_node(2, list(range(20))),
    create_node(2, list(range(20))),
    create_node(2, list(range(20))),
    create_node(2, list(range(20))),
    create_node(2, list(range(20))),
    create_node(2, list(range(20))),
    create_node(2, list(range(20))),
    create_node(2, list(range(20))),
    create_node(2, list(range(20))),
    create_node(2, list(range(20)))
  ]),
  create_layer([
    create_node(3, list(range(10)), True),
    create_node(3, list(range(10)), True),
    create_node(3, list(range(10)), True),
    create_node(3, list(range(10)), True),
    create_node(3, list(range(10)), True),
    create_node(3, list(range(10)), True),
    create_node(3, list(range(10)), True),
    create_node(3, list(range(10)), True),
    create_node(3, list(range(10)), True),
    create_node(3, list(range(10)), True)
  ])
])

"""
  0
6   1
  5
4   2
  3
"""

all_input_layers = [
  create_layer([#0
    create_input_node(1),
    create_input_node(1),
    create_input_node(1),
    create_input_node(1),
    create_input_node(1),
    create_input_node(0),
    create_input_node(1)
  ]),
  create_layer([#1
    create_input_node(0),
    create_input_node(1),
    create_input_node(1),
    create_input_node(0),
    create_input_node(0),
    create_input_node(0),
    create_input_node(0)
  ]),
  create_layer([#2
    create_input_node(1),
    create_input_node(1),
    create_input_node(0),
    create_input_node(1),
    create_input_node(1),
    create_input_node(1),
    create_input_node(0)
  ]),
  create_layer([#3
    create_input_node(1),
    create_input_node(1),
    create_input_node(1),
    create_input_node(1),
    create_input_node(0),
    create_input_node(1),
    create_input_node(0)
  ]),
  create_layer([#4
    create_input_node(0),
    create_input_node(1),
    create_input_node(1),
    create_input_node(0),
    create_input_node(0),
    create_input_node(1),
    create_input_node(1)
  ]),
  create_layer([#5
    create_input_node(1),
    create_input_node(0),
    create_input_node(1),
    create_input_node(1),
    create_input_node(0),
    create_input_node(1),
    create_input_node(1)
  ]),
  create_layer([#6
    create_input_node(1),
    create_input_node(0),
    create_input_node(1),
    create_input_node(1),
    create_input_node(1),
    create_input_node(1),
    create_input_node(1)
  ]),
  create_layer([#7
    create_input_node(1),
    create_input_node(1),
    create_input_node(1),
    create_input_node(0),
    create_input_node(0),
    create_input_node(0),
    create_input_node(0)
  ]),
  create_layer([#8
    create_input_node(1),
    create_input_node(1),
    create_input_node(1),
    create_input_node(1),
    create_input_node(1),
    create_input_node(1),
    create_input_node(1)
  ]),
  create_layer([#9
    create_input_node(1),
    create_input_node(1),
    create_input_node(1),
    create_input_node(0),
    create_input_node(0),
    create_input_node(1),
    create_input_node(1)
  ])
]

def train_all_input_layers(number_trials_per, learning_rate):
  for the_layer in sorted(all_input_layers, key = lambda x: random.random()):
    index = list(map(lambda layer: layer.nodes, all_input_layers)).index(the_layer.nodes)
    
    #if current_finals[index] > .95: continue
    network_info.layers[0] = the_layer
    answer_key = [0.8] * len(all_input_layers)
    answer_key[index] = 1

    for _ in range(number_trials_per[index]):
      if current_finals[index] < .2:
        network_info.train(answer_key, learning_rate * 10)
      else:
        network_info.train(answer_key, learning_rate)

def test():
  for index, layer in enumerate(all_input_layers):
    network_info.layers[0] = layer
    answer_key = [0.8] * len(all_input_layers)
    answer_key[index] = 1
    outputs = list(map(lambda node: node.calculate(), network_info.layers[::-1][0].nodes))
    avg = 0
    for output, answer in zip(outputs, answer_key):
      avg += abs(output - answer)
    avg /= len(answer_key)
    current_finals[index] = outputs[index]
    print("    ", index, ":", avg, "\n", outputs)

trials_per = [10] * len(all_input_layers)
current_finals = [0] * len(all_input_layers)

for i in range(100000000):
  if i % 10 == 0:
    print(i, ":")
    test()
    print("\n--\n")
  train_all_input_layers(trials_per, .0001)