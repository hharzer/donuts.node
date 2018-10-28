//-----------------------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
// Licensed under the MIT License. See License file under the project root for license information.
//-----------------------------------------------------------------------------
'use strict';

/** @type {NativeWeakReferenceModule} */
// @ts-ignore
const weakReference = require("./weak-reference");
const { EventEmitter } = require("events");

/**
 * @template {object} T
 * @implements {WeakReference<T>}
 */
class WeakReferenceImpl extends EventEmitter {
    /**
     * 
     * @param {NativeWeakReference<T>} nativeWeakRef 
     */
    constructor(nativeWeakRef) {
        super();

        this.nativeWeakRef = nativeWeakRef;
        this.nativeWeakRef.setWatcher(() => this.emit("died", this));
    }

    /**
     * @returns {boolean}
     */
    isDead() {
        return this.nativeWeakRef.isDead();
    }

    /**
     * @returns {T}
     */
    ref() {
        return this.nativeWeakRef.ref();
    }
}

/**
 * @template {object} T
 * Create a native weak reference pointing to the target object.
 * @param {object} target The target object to point to.
 * @returns {NativeWeakReference<T>} The native weak reference object pointing to the target object.
 */
export function createNative(target) {
    return weakReference.create(target);
}

/**
 * @template {object} T
 * Create a weak reference pointing to the target object.
 * @param {object} target The target object to point to.
 * @returns {WeakReference<T>} The weak reference object pointing to the target object.
 */
export function create(target) {
    return new WeakReferenceImpl(createNative(target));
}
