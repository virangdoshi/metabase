(ns metabase.query-processor-test.date-time-zone-functions-test
  (:require [clojure.test :as t]
            [metabase.query-processor-test :refer :all]
            [metabase.test :as mt]
            [metabase.test.data :as data]))

(defn- test-date-extract
  [expr & [filter]]
  (->> {:expressions {"test" expr}
        :fields      [[:expression "test"]]
        ;; filter clause is optional
        :filter      filter
        ;; To ensure stable ordering
        :order-by    [[:asc [:field (data/id :users :id) nil]]]
        :limit       1}
       (mt/run-mbql-query users)
       rows
       ffirst))

(t/deftest extraction-function-tests
  (mt/test-drivers (mt/normal-drivers-with-feature :date-functions)
    (doseq [[expected expr filter] [[2016 [:get-year "2016-05-01 01:23:45Z"] nil]
                                    [2021 [:get-year "2021-12-08"] nil]
                                    [2014
                                     [:get-year [:field (mt/id :users :last_login) nil]]
                                     [:= [:field (mt/id :users :id) nil] 10]]]]
      (t/testing (format "%s function works as expected on %s" (first expr) (second expr))
        (t/is (= expected (test-date-extract expr filter)))))))
