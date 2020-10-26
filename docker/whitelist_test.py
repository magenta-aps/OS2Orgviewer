import unittest

import requests
from parameterized import parameterized


test_urls = [
    ("service/configuration/", False),
    ("service/o/", True),
    ("service/o/3b866d97-0b1f-48e0-8078-686d96f430b3/", False),
    ("service/o/3b866d97-0b1f-48e0-8078-686d96f430b3/f/", False),
    ("service/o/3b866d97-0b1f-48e0-8078-686d96f430b3/e/", True),
    ("service/o/3b866d97-0b1f-48e0-8078-686d96f430b3/ou/", True),
    ("service/ou/create", False),
    ("service/ou/f06ee470-9f17-566f-acbe-e938112d46d9/", True),
    ("service/ou/f06ee470-9f17-566f-acbe-e938112d46d9/children", True),
    ("service/ou/f06ee470-9f17-566f-acbe-e938112d46d9/details/address", True),
    ("service/ou/f06ee470-9f17-566f-acbe-e938112d46d9/details/association", True),
    ("service/ou/f06ee470-9f17-566f-acbe-e938112d46d9/details/manager", True),
    ("service/ou/ancestor-tree?uuid=f06ee470-9f17-566f-acbe-e938112d46d9", True),
    ("service/e/ffbe5804-cf13-450a-a41b-47865e355a15/", True),
    ("service/e/ffbe5804-cf13-450a-a41b-47865e355a15/details/association", True),
    ("service/e/ffbe5804-cf13-450a-a41b-47865e355a15/details/address", True),
    ("service/e/ffbe5804-cf13-450a-a41b-47865e355a15/details/engagement", True),
]


class TestStringMethods(unittest.TestCase):

    @parameterized.expand(test_urls)
    def test_url(self, url, expected):
        protocol = "http"
        host = "localhost:8083"
        url = f"{ protocol }://{ host }/{url}"

        response = requests.get(url)
        if expected:
            self.assertEqual(response.status_code, 200)
            self.assertIn("application/json", response.headers['content-type'])
            response.json()
        else:
            self.assertEqual(response.status_code, 404)
            self.assertIn("text/html", response.headers['content-type'])



if __name__ == '__main__':
    unittest.main()
