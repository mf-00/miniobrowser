/*
 * Minio Browser (C) 2016 Minio, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as actions from './actions'

export default (state = {buckets:[], visibleBuckets:[], objects:[], diskInfo:{}, currentBucket: '',
                currentPath: '', showMakeBucketModal: false, upload: {},
                alert: {show: false, type: '', message: ''}, loginError : false}, action) => {
  let newState = Object.assign({}, state)
  switch (action.type) {
    case actions.SET_WEB:
      newState.web = action.web
      break
    case actions.SET_BUCKETS:
      newState.buckets = action.buckets
      break
    case actions.ADD_BUCKET:
      newState.buckets = [action.bucket, ...newState.buckets]
      newState.visibleBuckets = [action.bucket, ...newState.visibleBuckets]
      break
    case actions.SET_VISIBLE_BUCKETS:
      newState.visibleBuckets = action.visibleBuckets
      break
    case actions.SET_CURRENT_BUCKET:
      newState.currentBucket = action.currentBucket
      break
    case actions.SET_OBJECTS:
      newState.objects = action.objects
      break
    case actions.SET_CURRENT_PATH:
      newState.currentPath = action.currentPath
      break
    case actions.SET_DISK_INFO:
      newState.diskInfo = action.diskInfo
      break
    case actions.SHOW_MAKEBUCKET_MODAL:
      newState.showMakeBucketModal = action.showMakeBucketModal
      break
    case actions.ADD_OBJECT:
      let idx = newState.objects.findIndex(object => object.name === action.object.name)
      if (idx > -1) newState.objects.splice(idx, 1)
      newState.objects = [action.object, ...newState.objects]
      break
    case actions.SET_UPLOAD:
      newState.upload = action.upload
      break
    case actions.SET_ALERT:
      if (newState.alert.alertTimeout) clearTimeout(newState.alert.alertTimeout)
      newState.alert = action.alert
      break
    case actions.SET_LOGIN_ERROR:
      newState.loginError = true
      break
    case actions.SET_SHOW_ABORT_MODAL:
      newState.showAbortModal = action.showAbortModal
      break
    case actions.SHOW_ABOUT:
      newState.showAbout = action.showAbout
      break
  }
  return newState
}
